"use client";

import InputComponent1 from "@/components/antd/Inputs/InputComponent1";
import ButtonFilled from "@/components/shared/Buttons/ButtonFilled";
import { SearchOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";

interface SearchboxFormValues {
  query: string;
  location: string;
  when: string;
}

const inputShell =
  "rounded-md !border !border-shark-300 !pt-[9px] !pb-[9px] !pl-[15px] !pr-[15px] bg-white-100";

const Searchbox = () => {
  const { control, handleSubmit } = useForm<SearchboxFormValues>({
    defaultValues: { query: "", location: "", when: "" },
  });

  const onSubmit = (data: SearchboxFormValues) => {
    console.log("Search:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row gap-6 lg:gap-0 items-center justify-between bg-shark-100 rounded-xl border-4 border-shark-950 p-4 w-full md:w-4/5 lg:w-2/3 2xl:w-1/2"
    >
      <div className="w-full h-full flex flex-col md:flex-row md:items-center gap-6 md:gap-0">
        <InputComponent1
          name="query"
          control={control}
          label="What are you looking for?"
          placeholder="Doctor, Haircutter, tutoring"
          labelClassName="!text-sm !text-shark-400 !font-inter !ml-[11px]"
          containerClassName="flex flex-col !gap-0 !items-start md:!w-full"
          inputContainerClassName={`!border-none !py-0 !text-base ${inputShell}`}
        />
        <div className="w-full h-px md:w-px md:h-full bg-shark-200 mx-4" />
        <InputComponent1
          name="location"
          control={control}
          label="Where?"
          placeholder="Address, city"
          labelClassName="!text-sm !text-shark-400 !font-inter !ml-[11px]"
          containerClassName="flex flex-col !gap-0 !items-start md:!w-1/2"
          inputContainerClassName={`!border-none !py-0 !text-base !text-shark-950 ${inputShell}`}
        />
        <div className="w-full h-px md:w-px md:h-full bg-shark-200 mx-4" />
        <InputComponent1
          name="when"
          control={control}
          label="When?"
          placeholder="Date"
          labelClassName="!text-sm !text-shark-400 !font-inter !ml-[11px]"
          containerClassName="flex flex-col !gap-0 !items-start"
          inputContainerClassName={`!border-none !py-0 !text-base !text-shark-950 ${inputShell}`}
        />
      </div>
      <ButtonFilled
        type="submit"
        text="Search"
        icon={<SearchOutlined />}
        className="!text-base !font-inter !font-medium !py-4 !px-6 !rounded-lg !w-full lg:!hidden"
      />
      <ButtonFilled
        type="submit"
        text="Search"
        icon={<SearchOutlined />}
        className="!text-base !font-inter !font-medium !py-4 !px-6 !rounded-lg !hidden lg:!block"
      />
    </form>
  );
};

export default Searchbox;
