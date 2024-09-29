import './Achievements.scss';

import { AchievementType } from "./achievementType";

const Achievements = () => {

    const achievements: AchievementType[] = [
        {
            id: 1,
            name: "Sports Freak",
            description: "Participate in 100 sport events",
            points: 75,
            neededPoints: 100,
            icon: "🏅",
            completed: false,
            date: "",
        },
        {
            id: 2,
            name: "Calories Burner",
            description: "Burn 20.000kcal",
            points: 20000,
            neededPoints: 20000,
            icon: "🔥",
            completed: true,
            date: "2024-08-12",
        },
        {
            id: 3,
            name: "One Trick Pony",
            description: "Participate in 50 events of the same category",
            points: 30,
            neededPoints: 50,
            icon: "⭐",
            completed: false,
            date: "",
        },
        {
            id: 4,
            name: "Jack of All Trades",
            description: "Participate in 10 events of unique categories",
            points: 4,
            neededPoints: 10,
            icon: "🃏",
            completed: false,
            date: "",
        }
    ];

    return <div className="container">
        {achievements.map((achievement) => (
            <div key={achievement.id} className="achievement">
                <div className='achievement-headline'>
                    <p className='title'>{achievement.name}</p>
                    <p className='icon'>{achievement.icon}</p>
                    <p className='description'>{achievement.description}</p>
                </div>
                <div className='bottom achievement-footer'>
                    <div className='progress-container'>
                        <div className='progress-bar' style={{ width: `${100 * achievement.points / achievement.neededPoints}%` }}>
                        </div>
                    </div>
                    {achievement.completed ? <p className='description'>Completed on {achievement.date}</p> : <p className='description'>{100 * achievement.points / achievement.neededPoints}% to complete</p>}
                </div>
            </div>
        ))}
    </div>;
};

export default Achievements;