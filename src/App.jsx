import { SiteHeader } from "./components/siteHeader/index.jsx";
import { EventWorkspace } from "./components/eventWorkspace/index.jsx";
import styles from "./App.module.css";

const App = () => (
    <div className={styles.appShell} id="top">
        <SiteHeader />
        <main className={styles.pageContent}>
            <EventWorkspace />
        </main>
    </div>
);

export default App;
