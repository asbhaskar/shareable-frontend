import { jsx, css } from "@emotion/react"
// import { useTheme } from "@mui/material/styles"

// const theme = useTheme()

// Just copied over from InsightCard style as first draft

const styles = {
    card:{
        minWidth: '400px',
        width: '820px',
        padding: '1rem',
        margin: '1rem auto'
    },
    card__header: {
        // backgroundColor: 'red',
        marginBottom: '1.45rem',
        display:'flex'
    },
    card__body: {
        display: 'flex'
    },
    card__imgs: {
        width: '40%',
        border:'1px solid #000',
        height:'auto',
        display: 'flex',
        justifyContent: 'center'
    },
    card__footer: {
        display: 'flex',
        margin: '2rem 10rem 0rem 10rem',
        justifyContent: 'space-between',
    },
}

export default styles