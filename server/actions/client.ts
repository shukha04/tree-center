import {createSafeActionClient, flattenValidationErrors} from "next-safe-action";
import {z, ZodType, ZodTypeDef} from "zod";

type SchemaType = ZodType<any, ZodTypeDef, any> | ((prevSchema: undefined) => Promise<ZodType<any, ZodTypeDef, any>>)

const actionClient = createSafeActionClient({
	defaultValidationErrorsShape: "flattened"
})
	.schema(z.object({}), {
		handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors
	});

export default actionClient;
