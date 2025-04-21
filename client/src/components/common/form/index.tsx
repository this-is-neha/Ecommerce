import { useController } from "react-hook-form"

import { Controller } from 'react-hook-form';

interface TextInputProps {
  type?: string,
  name: string,
  errMsg: string | null,
  required: boolean,
  control: any

}

interface CheckboxFieldProps {
  control: any;
  name: string;
  label: string;
  checked:boolean
  
}
export const TextInputField = ({ control, type = "text", name, errMsg = null, required = true }: TextInputProps) => {





  const { field } = useController({
    control: control,
    name: name,
    rules: {
      required: required
    }
  })
  return (

    <>


      <input
        id={name}
        type={type}
        {...field}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6 inavlid:border-pink-500
                  focus:invalid:border-opink-500 focus:invalid-pink-500 px-2"
      />
      <span className="text-red-500">{errMsg}</span>
    </>
  )
}

export const SelectComponent = ({ errMsg = null, name, control, options = [] }: { errMsg?: string | null, options?: any[], name: string, control: any }) => {

  const { field } = useController({
    control: control,
    name: name
  })

  return (
    <>

      <select
        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        {...field}
      >
        <option value="">--select any one--</option>
        {
          options && options.map((opt, ind) => (
            <option key={ind} value={opt.value}>
              {opt.value}
            </option>
          ))}
        {/* <option value="seller">Seller</option>
        <option value="cuustomer">Customer</option> */}
      </select>
      <span className="text-red-500">{errMsg}</span>

    </>
  )
}



export const SelectOptionComponent = ({ errMsg = null, name, control, options = [] }: { errMsg?: string | null, options?: any[], name: string, control: any }) => {
  return (
      <div>
          <Controller
              name={name}
              control={control}
              render={({ field }) => (
                  <select
                      {...field}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                  >
                      {options.map((option, index) => (
                          <option key={index} value={option.value}>{option.label}</option>
                      ))}
                  </select>
              )}
          />
          <span className="text-red">{errMsg}</span>
      </div>
  );


};



export const CheckboxField: React.FC<CheckboxFieldProps> = ({ control, name, label }) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <div className="flex items-center">
      <input
        id={name}
        type="checkbox"
        {...field}
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
};



 interface FileInputFieldProps {
  control: any;
  name: string;
  errMsg?: string | null;
  multiple?: boolean; 
}
export const FileInputField: React.FC<FileInputFieldProps> = ({
  control,
  name,
  errMsg = null,
  multiple = false, 
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <input
            type="file"
            onChange={(e) => field.onChange(e.target.files)}
            multiple={multiple}
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
          />
          {errMsg && <p className="text-red-600">{errMsg}</p>}
        </div>
      )}
    />
  );
};
