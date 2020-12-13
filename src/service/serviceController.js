import _ from 'lodash';

export const loginResponseController = (text) => {
    return text.text().then(res => {

        if (!text.ok) {
            if (text.status === 406) {
                return Promise.reject("Email is invalid.");
            }else if(text.status === 404) {
                return Promise.reject("Email not found.");
            }else if(text.status === 400) {
                return Promise.reject("Password is incorrect.");
            }else if(text.status === 401){
                return Promise.reject("Access Denied.");
            }else{
                return Promise.reject("Login Service Error");
            }
        }
        let data = JSON.parse(res);
        // if(data.user.userType !== 'admin'){
        //     return Promise.reject("Access Denied.");
        // }else{
            return Promise.resolve(data);
        // }
    });
};

export const getChapterComposer = (text) => {
    return text.text().then(res => {
        if (!text.ok) {
            if (text.status === 400) {
                return Promise.reject(res);
            }
            return Promise.reject(res);
        }


        let composeLessons = function (lessonArr) {
            const array = [];
            _.forEach(lessonArr, function (o) {
                let obj = {
                    number: o.number,
                    name: o.name,
                    description: o.description,
                    cost: o.cost,
                    active: o.active,
                    link: o.link
                };
                array.push(obj);
            });
            return array;
        };

        let chapters = [];

        _.forEach(JSON.parse(res), (o) => {
            let obj = {
                id: o._id,
                chapterNumber: o.chapterNumber,
                chapterName: o.chapterName,
                chapterCost: o.chapterCost,
                chapterDescription: o.chapterDescription,
                chapterPreviewLink: "https://www.youtube.com/embed/" + o.chapterPreviewLink.split('.be/')[1],
                lessons: composeLessons(o.lessons)
            };
            chapters.push(obj);
        });

        return Promise.resolve(chapters);
    });
};

export const getUserComposer = (text) => {
    return text.text().then(res => {
        if (!text.ok) {
            if (text.status === 400) {
                return Promise.reject(res);
            }
            return Promise.reject(res);
        }

        let arr = [];
        _.forEach(JSON.parse(res), function (o) {
            let obj = {
                id: o._id,
                name: o.name,
                email: o.email,
                creditBalance: o.creditBalance,
                pendingCredits: o.pendingCredits,
                subscribedChapters: o.subscribedChapters,
                userID: o.userID
            };
            arr.push(obj);
        });
        return Promise.resolve(arr);
    });
};

export const updateCreditComposer = (text) => {
    return text.text().then(res => {
        if (!text.ok) {
            if (text.status === 400) {
                return Promise.reject(res);
            }
            return Promise.reject(res);
        }
        return Promise.resolve(JSON.parse(res));
    });
};
