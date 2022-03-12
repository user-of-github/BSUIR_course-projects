import Style from './Loading.module.css'


export const Loading = (): JSX.Element => (
    <div className={Style.container}>
        <svg width={'50%'} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={Style.outer}
                  d="M6.0487 120.217C13.0698 86.2817 31.8541 55.9179 59.0856 34.4856C86.3172 13.0533 120.245 1.93061 154.88 3.08102C189.515 4.23144 222.63 17.581 248.379 40.7731C274.129 63.9652 290.857 95.5086 295.61 129.835"
                  stroke="#59419E"
                  strokeWidth="6"/>
            <path className={Style.inner}
                  d="M107.557 92.1451C120.44 82.6834 136.105 77.7777 152.083 78.2012C168.062 78.6247 183.446 84.3532 195.809 94.484C208.173 104.615 216.814 118.572 220.371 134.155C223.928 149.739 222.197 166.063 215.453 180.555"
                  stroke="#4A35D1"
                  strokeWidth="6"/>
        </svg>

        <h3>Loading</h3>
    </div>
)