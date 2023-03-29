// Function to get all github repos
async function getStories() {
    //Try to fetch data from github api
    try {
        const url =
            "https://opensheet.elk.sh/1V6woKLR6VnNZZ4oxiMryA6a9YHhmPzIzLJXKToFXqFE/1";
        const response = await fetch(url);

        // Check if response is ok
        if (response.status >= 200 && response.status <= 299) {
            const data = await response.json();
            const newArray = data.map((list) => {
                return {
                    id: list.id,
                    title: list.title,
                    imgUrl: list.imgUrl,
                    summary: list.summary,
                };
            });
            return newArray;
        }

        console.log(newArray);

        // Catch errors
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getStories
};