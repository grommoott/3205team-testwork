import { DatePicker, TimePicker } from "antd"
import { FC } from "react"

interface Props {
    value?: Date | undefined
    onChange?: (value: Date) => void
}

const style = {
    borderRadius: "1rem",
    backgroundColor: "var(--color-blue-100)",
    borderColor: "transparent",
    padding: "0.5rem",
}

const DateTimePicker: FC<Props> = ({ value, onChange = () => {} }) => {
    return (
        <div className="flex flex-row gap-2 items-center">
            <DatePicker
                className="rounded"
                allowClear={true}
                placeholder="Дата"
                onChange={(e) => {
                    const date = new Date(value || new Date())
                    date.setFullYear(e.year(), e.month(), e.date())
                    onChange(date)
                }}
                style={style}
            />

            <TimePicker
                allowClear={true}
                placeholder="Время"
                onChange={(e) => {
                    const date = new Date(value || new Date())
                    date.setHours(
                        e.hour(),
                        e.minute(),
                        e.second(),
                        e.millisecond(),
                    )
                    onChange(date)
                }}
                style={style}
            />
        </div>
    )
}

export default DateTimePicker
