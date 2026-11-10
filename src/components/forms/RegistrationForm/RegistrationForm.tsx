import { useForm } from "react-hook-form";

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegistrationFormValues>();

  const onSubmit = (data: RegistrationFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Registration</h2>
      <div>
        <label htmlFor="name">Имя</label>
        <input
          {...register("name", {
            required: "Введите имя",
            minLength: {
              value: 2,
              message: "Минимум 2 символа",
            },
          })}
          type="text"
          id="name"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          {...register("email", {
            required: "Введите email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Введите корректный email",
            },
          })}
          type="email"
          id="email"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <input
          {...register("password", {
            required: "Введите пароль",
            minLength: {
              value: 8,
              message: "Пароль должен содержать минимум 8 символов",
            },
          })}
          type="password"
          id="password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Подтверждение пароля</label>
        <input
          {...register("confirmPassword", {
            required: "Повторите пароль",
            validate: (value) =>
              value === getValues("password") || "Пароли не совпадают",
          })}
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
