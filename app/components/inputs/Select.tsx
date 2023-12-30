"use Client"

import styles from "./select.module.css";

import ReactSelect from "react-select";
interface SelectProps {
    label: string;
    value?: Record<string, any>
    onChange: (value: Record<string, any>) => void;
    options: Record<string, any>[]
    disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
    label,
    value,
    onChange,
    options,
    disabled
}) => {
    return (
        <div className={styles.select} >
            <label className={styles.selectLabel}>
                {label}
            </label>
            <div className={styles.selectSelctor}>
                <ReactSelect
                    isDisabled={disabled}
                    value={value}
                    onChange={onChange}
                    isMulti
                    options={options}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 9999
                        })
                    }}
                /*          classNames={{
                              control: () => style={{"font-size: 0.875rem"}}
                          }}  */
                />
            </div>
        </div>
    )
}

export default Select;