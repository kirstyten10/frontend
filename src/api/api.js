const API_URL = "http://localhost:8080/books";

export const importBooks = async () => {
    try {
        const response = await fetch(`${API_URL}/import`, {
            method: "POST",
        });

        if (response.ok) {
            return await response.text();
        } else {
            throw new Error("Failed to import books.");
        }
    } catch (error) {
        console.error(error);
    }
};
