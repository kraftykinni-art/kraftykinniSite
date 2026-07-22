import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { workshopsData } from '../data/workshops';

/**
 * Registers Kraftykinni's workshop data and booking flow as WebMCP tools
 * via navigator.modelContext.registerTool(), per the emerging WebMCP
 * proposal. This lets an AI agent that's driving the browser on someone's
 * behalf look up workshops/pricing and trigger the same booking flow a
 * human would click through — nothing here exposes any data beyond what's
 * already public on the page, and no server/API is involved.
 *
 * Safe no-op in any browser that doesn't implement navigator.modelContext.
 */
export function useWebMCP() {
  const navigate = useNavigate();

  useEffect(() => {
    const modelContext = (navigator as any).modelContext;
    if (!modelContext || typeof modelContext.registerTool !== 'function') return;

    const unregisterFns: Array<() => void> = [];

    const register = (tool: Record<string, unknown>) => {
      const handle = modelContext.registerTool(tool);
      if (handle && typeof handle.unregister === 'function') {
        unregisterFns.push(() => handle.unregister());
      }
    };

    register({
      name: 'list_workshops',
      description:
        'List every Kraftykinni art workshop activity with its id, category, duration, and a one-line intro.',
      inputSchema: { type: 'object', properties: {} },
      execute: async () => ({
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              workshopsData.map((w) => ({
                id: w.id,
                title: w.title,
                category: w.category,
                duration: w.duration,
                intro: w.intro,
              }))
            ),
          },
        ],
      }),
    });

    register({
      name: 'get_workshop_details',
      description:
        'Get full details (benefits, who it suits, FAQ) for one Kraftykinni workshop, looked up by its id (e.g. "lippan-art", "mandala-art", "block-printing").',
      inputSchema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Workshop id, e.g. lippan-art' },
        },
        required: ['id'],
      },
      execute: async ({ id }: { id: string }) => {
        const workshop = workshopsData.find((w) => w.id === id);
        if (!workshop) {
          return {
            content: [
              {
                type: 'text',
                text: `No workshop found with id "${id}". Call list_workshops to see valid ids.`,
              },
            ],
          };
        }
        return { content: [{ type: 'text', text: JSON.stringify(workshop) }] };
      },
    });

    register({
      name: 'start_booking',
      description:
        'Scroll to (or navigate to) the Kraftykinni booking/contact form so the user can submit a workshop booking request. Pricing is ₹600–₹800 per person, all materials included; 7 days advance notice and a 50% deposit are required to confirm.',
      inputSchema: { type: 'object', properties: {} },
      execute: async () => {
        if (window.location.pathname === '/') {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        } else {
          sessionStorage.setItem('scrollTarget', 'contact');
          navigate('/');
        }
        return { content: [{ type: 'text', text: 'Opened the booking/contact form.' }] };
      },
    });

    return () => {
      unregisterFns.forEach((fn) => fn());
    };
  }, [navigate]);
}
