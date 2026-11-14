import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "./registrationSchema";
import type { RegistrationFormValues } from "./registrationSchema";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = (data: RegistrationFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Registration</h2>
      <div>
        <label htmlFor="name">Имя</label>
        <input {...register("name")} type="text" id="name" />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input {...register("email")} type="email" id="email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <input {...register("password")} type="password" id="password" />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Подтверждение пароля</label>
        <input
          {...register("confirmPassword")}
          type="password"
          id="confirmPassword"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default RegistrationForm;
