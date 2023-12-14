import React, { useState } from 'react'

// typescript typing
interface FormProps {
    onSubmit: (data: FormData) => void;
}

interface FormData {
    teamName: string;
}

function InsertForm({ onSubmit }: FormProps) {
    const [formData, setFormData] = useState<FormData>({
        teamName: ""
    });

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        return setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Team Name:
                <input type="text" name="teamName" value={formData.teamName} onChange={handleInput} />
            </label>
            <br />
            <button type="submit">Add Team</button>
        </form>
    )
}

export default InsertForm