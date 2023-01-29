import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

const router = t.router({
    getUsers: t.procedure
        .output(
            z.array(
                z.object(
                  {
                    id: z.number(),
                    name: z.string()
                  }
                )
            )
        )
        .query(() => {
            return [{ id: 1, name: 'Daniel'}, { id: 2, name: 'Pedro'}]
        }),

    getUser: t.procedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .query(({ input }) => {
            return {
                id: input.id,
                name: "Daniel"
            }
        })
});

export default router;