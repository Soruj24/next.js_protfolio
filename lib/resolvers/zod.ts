import type { FieldErrors, FieldValues, Resolver } from "react-hook-form";
import { z, type ZodSchema } from "zod";

export function zodResolver<T extends FieldValues>(
  schema: ZodSchema<T>
): Resolver<T> {
  return async (values) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return { values: result.data, errors: {} as FieldErrors<T> };
    }

    const fieldErrors: FieldErrors<T> = {} as FieldErrors<T>;

    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      if (path && !fieldErrors[path as keyof T]) {
        (fieldErrors as Record<string, unknown>)[path] = {
          type: "validate",
          message: issue.message,
        };
      }
    }

    return { values: {}, errors: fieldErrors };
  };
}
