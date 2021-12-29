import * as Yup from 'yup';

export class CustomDueDateData {
  constructor(readonly dueDate: string) {}

  static initial(value?: string): CustomDueDateData {
    return new CustomDueDateData(value ?? '');
  }
}

export const CustomDueDateSchema = Yup.object().shape({
  dueDate: Yup.string().trim().required('customer_component.val_due_after_required'),
});
