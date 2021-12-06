import ProfileCard from "./connection-card";

const SuggestedProfileCollection = () => {
  const userSuggestions = [
    {
      profileImage: null,
      name: "Sukannya Paul",
      title: "I love to do flirt",
      mutual_connections: 18,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Paulomi Kundu",
      title: "I am a girl but don't belive it. I am a girl but don't belive it",
      mutual_connections: 20,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Sunny Leone",
      title: "Love to watch movies babe",
      mutual_connections: 40,
    },
    {
      profileImage:
        "https://m.media-amazon.com/images/M/MV5BMzc1YTA1ZjItMWRhMy00ZTBlLTkzNTgtNTc4ZDE3YTM3ZDk2XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
      name: "Mia Khalifa",
      title: "Different Person. Normal Personality",
      mutual_connections: 35,
    },
    {
      profileImage:
        "https://media1.popsugar-assets.com/files/thumbor/kL29MFiN7kf3VN3Rbi18s38HXMY/186x52:2258x2124/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/04/08/705/n/1922398/1c0039b55e8df427cd8537.59120730_/i/Paul-Walker.jpg",
      name: "Paul Walker",
      title: "Famous Actor for Fast and Furious Movie Series",
      mutual_connections: 45,
    },
    {
      profileImage:
        "https://149566639.v2.pressablecdn.com/wp-content/uploads/2021/05/the-rock.jpg",
      name: "Dwayne Thompson",
      title: "Developer at the Beach",
      mutual_connections: 50,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Siddarth Malhotra",
      title: "Love to do Acting",
      mutual_connections: 29,
    },
    {
      profileImage:
        "https://yt3.ggpht.com/3vwdwPM7w4Y7wE86x-uY-pB2MTmA7IP7ihGl2yaUd8TsFetgOBKF8XVhvC8Yj76vCdHpuLsi=s900-c-k-c0x00ffffff-no-rj",
      name: "Amitava Garai",
      title: "Music is my life",
      mutual_connections: 20,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Sukannya Paul",
      title: "I love to do flirt",
      mutual_connections: 18,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Paulomi Kundu",
      title: "I am a girl but don't belive it. I am a girl but don't belive it",
      mutual_connections: 20,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Sunny Leone",
      title: "Love to watch movies babe",
      mutual_connections: 40,
    },
    {
      profileImage:
        "https://m.media-amazon.com/images/M/MV5BMzc1YTA1ZjItMWRhMy00ZTBlLTkzNTgtNTc4ZDE3YTM3ZDk2XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
      name: "Mia Khalifa",
      title: "Different Person. Normal Personality",
      mutual_connections: 35,
    },
    {
      profileImage:
        "https://media1.popsugar-assets.com/files/thumbor/kL29MFiN7kf3VN3Rbi18s38HXMY/186x52:2258x2124/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/04/08/705/n/1922398/1c0039b55e8df427cd8537.59120730_/i/Paul-Walker.jpg",
      name: "Paul Walker",
      title: "Famous Actor for Fast and Furious Movie Series",
      mutual_connections: 45,
    },
    {
      profileImage:
        "https://149566639.v2.pressablecdn.com/wp-content/uploads/2021/05/the-rock.jpg",
      name: "Dwayne Thompson",
      title: "Developer at the Beach",
      mutual_connections: 50,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Siddarth Malhotra",
      title: "Love to do Acting",
      mutual_connections: 29,
    },
    {
      profileImage:
        "https://yt3.ggpht.com/3vwdwPM7w4Y7wE86x-uY-pB2MTmA7IP7ihGl2yaUd8TsFetgOBKF8XVhvC8Yj76vCdHpuLsi=s900-c-k-c0x00ffffff-no-rj",
      name: "Amitava Garai",
      title: "Music is my life",
      mutual_connections: 20,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Sukannya Paul",
      title: "I love to do flirt",
      mutual_connections: 18,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Paulomi Kundu",
      title: "I am a girl but don't belive it. I am a girl but don't belive it",
      mutual_connections: 20,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Sunny Leone",
      title: "Love to watch movies babe",
      mutual_connections: 40,
    },
    {
      profileImage:
        "https://m.media-amazon.com/images/M/MV5BMzc1YTA1ZjItMWRhMy00ZTBlLTkzNTgtNTc4ZDE3YTM3ZDk2XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
      name: "Mia Khalifa",
      title: "Different Person. Normal Personality",
      mutual_connections: 35,
    },
    {
      profileImage:
        "https://media1.popsugar-assets.com/files/thumbor/kL29MFiN7kf3VN3Rbi18s38HXMY/186x52:2258x2124/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/04/08/705/n/1922398/1c0039b55e8df427cd8537.59120730_/i/Paul-Walker.jpg",
      name: "Paul Walker",
      title: "Famous Actor for Fast and Furious Movie Series",
      mutual_connections: 45,
    },
    {
      profileImage:
        "https://149566639.v2.pressablecdn.com/wp-content/uploads/2021/05/the-rock.jpg",
      name: "Dwayne Thompson",
      title: "Developer at the Beach",
      mutual_connections: 50,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Siddarth Malhotra",
      title: "Love to do Acting",
      mutual_connections: 29,
    },
    {
      profileImage:
        "https://yt3.ggpht.com/3vwdwPM7w4Y7wE86x-uY-pB2MTmA7IP7ihGl2yaUd8TsFetgOBKF8XVhvC8Yj76vCdHpuLsi=s900-c-k-c0x00ffffff-no-rj",
      name: "Amitava Garai",
      title: "Music is my life",
      mutual_connections: 20,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Sukannya Paul",
      title: "I love to do flirt",
      mutual_connections: 18,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Paulomi Kundu",
      title: "I am a girl but don't belive it. I am a girl but don't belive it",
      mutual_connections: 20,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Sunny Leone",
      title: "Love to watch movies babe",
      mutual_connections: 40,
    },
    {
      profileImage:
        "https://m.media-amazon.com/images/M/MV5BMzc1YTA1ZjItMWRhMy00ZTBlLTkzNTgtNTc4ZDE3YTM3ZDk2XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
      name: "Mia Khalifa",
      title: "Different Person. Normal Personality",
      mutual_connections: 35,
    },
    {
      profileImage:
        "https://media1.popsugar-assets.com/files/thumbor/kL29MFiN7kf3VN3Rbi18s38HXMY/186x52:2258x2124/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/04/08/705/n/1922398/1c0039b55e8df427cd8537.59120730_/i/Paul-Walker.jpg",
      name: "Paul Walker",
      title: "Famous Actor for Fast and Furious Movie Series",
      mutual_connections: 45,
    },
    {
      profileImage:
        "https://149566639.v2.pressablecdn.com/wp-content/uploads/2021/05/the-rock.jpg",
      name: "Dwayne Thompson",
      title: "Developer at the Beach",
      mutual_connections: 50,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Siddarth Malhotra",
      title: "Love to do Acting",
      mutual_connections: 29,
    },
    {
      profileImage:
        "https://yt3.ggpht.com/3vwdwPM7w4Y7wE86x-uY-pB2MTmA7IP7ihGl2yaUd8TsFetgOBKF8XVhvC8Yj76vCdHpuLsi=s900-c-k-c0x00ffffff-no-rj",
      name: "Amitava Garai",
      title: "Music is my life",
      mutual_connections: 20,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Sukannya Paul",
      title: "I love to do flirt",
      mutual_connections: 18,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Paulomi Kundu",
      title: "I am a girl but don't belive it. I am a girl but don't belive it",
      mutual_connections: 20,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Sunny Leone",
      title: "Love to watch movies babe",
      mutual_connections: 40,
    },
    {
      profileImage:
        "https://m.media-amazon.com/images/M/MV5BMzc1YTA1ZjItMWRhMy00ZTBlLTkzNTgtNTc4ZDE3YTM3ZDk2XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
      name: "Mia Khalifa",
      title: "Different Person. Normal Personality",
      mutual_connections: 35,
    },
    {
      profileImage:
        "https://media1.popsugar-assets.com/files/thumbor/kL29MFiN7kf3VN3Rbi18s38HXMY/186x52:2258x2124/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/04/08/705/n/1922398/1c0039b55e8df427cd8537.59120730_/i/Paul-Walker.jpg",
      name: "Paul Walker",
      title: "Famous Actor for Fast and Furious Movie Series",
      mutual_connections: 45,
    },
    {
      profileImage:
        "https://149566639.v2.pressablecdn.com/wp-content/uploads/2021/05/the-rock.jpg",
      name: "Dwayne Thompson",
      title: "Developer at the Beach",
      mutual_connections: 50,
    },
    {
      profileImage:
        "https://www.bibs.co.in/front/img/final/2019-2021/Nikita%20Kundu.jpg",
      name: "Siddarth Malhotra",
      title: "Love to do Acting",
      mutual_connections: 29,
    },
    {
      profileImage:
        "https://yt3.ggpht.com/3vwdwPM7w4Y7wE86x-uY-pB2MTmA7IP7ihGl2yaUd8TsFetgOBKF8XVhvC8Yj76vCdHpuLsi=s900-c-k-c0x00ffffff-no-rj",
      name: "Amitava Garai",
      title: "Music is my life",
      mutual_connections: 20,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8">
      {userSuggestions.map((user, index) => (
        <ProfileCard key={index} user={user} />
      ))}
    </div>
  );
};

export default SuggestedProfileCollection;
