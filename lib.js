import fetch from 'node-fetch'
import jsdom from 'jsdom'

export async function getGrass(user) {
    const url = `https://github.com/${user}`;
    const f = fetch(url);

    const res = await f;
    if (res.status >= 400) {
        throw new Error(`ERROR: ${res.statusText}`);
    } else {
        const text = await res.text();

        const dom = new jsdom.JSDOM(text);
        const a = Array.from(dom.window.document.querySelectorAll('.js-calendar-graph-svg rect.ContributionCalendar-day'))

        const calendar = a.map(e => ({ count: e.dataset.count, date: e.dataset.date }))

        let lastContributed = null;
        let current = 0;
        let longest = 0;
        {
            for (let i = 0; i < calendar.length; i++) {
                if (calendar[i].count > 0) {
                    // committed
                    lastContributed = calendar[i].date;
                    current++;
                    longest = Math.max(longest, current);
                } else {
                    current = 0;
                }
            }
        }
        return { user, currentStreak: current, lastContributed, longestStreak: longest };
    }
}

