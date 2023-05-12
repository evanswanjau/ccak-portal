export const parsePosts = (data) => {
    return data.map((item) => {
        if (item.title) {
            item.title = (
                <p className="truncate w-52" title={item.title}>
                    {item.title}
                </p>
            );
        }

        return item;
    });
};
