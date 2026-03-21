const getActivityImage = (activityName: string) => {
    switch (activityName) {
        case 'Běh/Chůze':
            return '/images/icons/person-walking.svg';
        case 'Kolo/Koloběžka':
            return '/images/icons/bicycle.svg';
        default:
            return '/images/default.png';
    }
};

export default getActivityImage;
