
export const createListItem = ({ id, make, model }) => `<a href="?id=${id}"><li>${make} ${model}</li></a>`;

export const createList = (guitars) => `
<h2><a href="/add">Add Guitar</a></h2>
<ul>
${guitars.map(createListItem).join('')}
</ul`;

export function getGuitarContent(guitar) {
    if (guitar) {
        return `<h2>${guitar.make} ${guitar.model}</h2>
        <p><a href="/delete/${guitar.id}">Delete</a></p>`;
    } else {
        return `<h2>Guitar not found</h2>`;
    }
}

export const getForm = () => `<form action="/save" method="POST">
                            <label for="guitar_make">Guitar Make:</label>
                            <input type="text" id="guitar_make" name="guitar_make" required>

                            <label for="guitar_model">Guitar Model:</label>
                            <input type="text" id="guitar_model" name="guitar_model" required>

                            <input type="submit" value="Submit">
                            </form>`;


export const view = (content) => `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                                <title>Simple HTML Template</title>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        margin: 0;
                                        padding: 0;
                                        background-color: #f4f4f4;
                                    }
                                    header {
                                        background-color: #333;
                                        color: #fff;
                                        padding: 1rem 0;
                                        text-align: center;
                                    }
                                    nav {
                                        text-align: center;
                                        margin: 20px 0;
                                    }
                                    nav a {
                                        margin: 0 15px;
                                        text-decoration: none;
                                        color: #333;
                                    }
                                    main {
                                        padding: 20px;
                                        // text-align: center;
                                    }
                                    footer {
                                        background-color: #333;
                                        color: #fff;
                                        text-align: center;
                                        padding: 10px 0;
                                        position: fixed;
                                        bottom: 0;
                                        width: 100%;
                                    }
                                </style>
                            </head>
                            <body>

                            <header>
                                <h1>Welcome to My Website</h1>
                            </header>


                            <main>
                            ${content}
                            </main>

                            <footer>
                                <p>&copy; 2025 My Website. All rights reserved.</p>
                            </footer>

                            </body>
                            </html>
                            `;
