import type { Ref } from "vue";
import type { FormInst } from "naive-ui";
import type { RuleItem, ErrorList } from "async-validator";

import { unref } from "vue";

type FormValidateCallback = (errors?: ErrorList[]) => void;

type ValidationTrigger = "input" | "change" | "blur" | "focus";

type FormItemRuleValidatorParams = Parameters<
  NonNullable<RuleItem["validator"]>
>;

type FormItemRuleValidator = (
  ...args: FormItemRuleValidatorParams
) => boolean | Error | Error[] | Promise<void> | undefined;

type FormItemRuleAsyncValidator = (
  ...args: FormItemRuleValidatorParams
) => Promise<void> | undefined;

type FormItemRule = Omit<RuleItem, "validator" | "asyncValidator"> & {
  trigger?: ValidationTrigger | string | Array<ValidationTrigger | string>;
  validator?: FormItemRuleValidator;
  asyncValidator?: FormItemRuleAsyncValidator;
};

type ApplyRule = (rule: FormItemRule) => boolean;

export default function useForm(formRef: Ref): FormInst {
  const validate = (
    validateCallback?: FormValidateCallback,
    shouldRuleBeApplied: ApplyRule = () => true
  ): Promise<void> =>
    unref(formRef).validate(validateCallback, shouldRuleBeApplied);

  const restoreValidation = (): void => formRef.value.restoreValidation();

  return {
    validate,
    restoreValidation,
  };
}
