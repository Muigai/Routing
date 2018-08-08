import { React } from "rahisi";
import { Link, Switch } from "rahisi-routing";

interface Player {
    number: number;
    name: string;
    position: string;
}

// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const PlayerAPI = {
    players: [
        { number: 1, name: "Ben Blocker", position: "G" },
        { number: 2, name: "Dave Defender", position: "D" },
        { number: 3, name: "Sam Sweeper", position: "D" },
        { number: 4, name: "Matt Midfielder", position: "M" },
        { number: 5, name: "William Winger", position: "M" },
        { number: 6, name: "Fillipe Forward", position: "F" },
    ],
    all() { return this.players; },
    get(id: number) {
        return this.players.find((p) => p.number === id);
    },
};

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
const FullRoster = () => (
    <div>
        <ul>
            {
                PlayerAPI.all().map((p) => (
                    <li>
                        <Link href={`/roster/${p.number}`}>{p.name}</Link>
                    </li>
                ))
            }
        </ul>
    </div>
);

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
const Player = (props: Map<string | number, string>) => {
    const num = props.get("number");
    const player = num && PlayerAPI.get(parseInt(num, 10));
    if (!player) {
        return <div>Sorry, but the player was not found</div>;
    }
    return (
        <div>
            <h1>{player.name} (#{player.number})</h1>
            <h2>Position: {player.position}</h2>
            <Link href="/roster">Back</Link>
        </div>
    );
};

const errorMessage =
    () => {
        return <div>Error Occured</div>;
    };

const Schedule = () => (
    <div>
        <ul>
            <li>6/5 @ Evergreens</li>
            <li>6/8 vs Kickers</li>
            <li>6/14 @ United</li>
        </ul>
    </div>
);

// The Roster component matches one of two different routes
// depending on the full pathname
const rosterRoutes = [
    { path: "/roster", action: FullRoster },
    { path: "/roster/:number", action: (a: Map<string | number, string>) => Player(a) },
];
const Roster = () => (
    <section>
        {Switch(rosterRoutes, errorMessage())}
    </section>
);

const Home = () => (
    <div>
        <h1>Welcome to the Tornadoes Website!</h1>
    </div>
);

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const mainRoutes = [
    { path: "/", action: Home },
    { path: "/roster/:number?", action: Roster },
    { path: "/schedule", action: Schedule },
];
const Main = () => (
    <main>
        {Switch(mainRoutes, errorMessage())}
    </main>
);

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/roster">Roster</Link></li>
                <li><Link href="/schedule">Schedule</Link></li>
            </ul>
        </nav>
    </header>
);

const App = () => (
    <div>
        <Header />
        <Main />
    </div>
);

document.addEventListener("DOMContentLoaded", () => App().mount(document.body), false);
