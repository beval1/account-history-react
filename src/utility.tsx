export const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: (value: React.SetStateAction<any>) => void
) => {
    setState((prev: any) => ({
        ...prev,
        [e.target.name]: e.target.value.trim(),
    }));
}

export function convertUTCDateToLocalDate(date: Date | null) {
    return date ? new Date(new Date(date).getTime() - new Date(date).getTimezoneOffset()*60*1000) : null;
}