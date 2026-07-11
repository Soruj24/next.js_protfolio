import type { FieldValues, Resolver } from "react-hook-form";
import { z, type ZodSchema } from "zod";

export function zodResolver<T extends FieldValues>(
  schema: ZodSchema<T>
): Resolver<T> {
  return (async (values: Record<string, unknown>) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const fieldErrors: Record<string, { type: string; message: string }> = {};

    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      if (path && !fieldErrors[path]) {
        fieldErrors[path] = {
          type: "validate",
          message: issue.message,
        };
      }
    }

    return { values: {}, errors: fieldErrors };
  }) as Resolver<T>;
}
