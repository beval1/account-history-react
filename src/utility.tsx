export const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: (value: React.SetStateAction<any>) => void
) => {
    setState((prev: any) => ({
        ...prev,
        [e.target.name]: e.target.value.trim(),
    }));
}