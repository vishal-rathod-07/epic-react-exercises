import { useContext } from "react"
import { ThemeContext } from "providers"
import { TextButton } from "components/button"
import { PrettyHeader } from "components/pretty-defaults"

const POKEMON_CARD_STYLE = {
    padding: "20px",
    margin: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "15px",
    minHeight: "400px",
}

const POKEMON_IMAGE_STYLE = {
    width: "200px",
    minHeight: "200px",
    borderRadius: "15px",
    padding: "5px",
    fontSize: "30px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const ROW_STYLE = {
    lineHeight: "25px",
    padding: "5px",
    minWidth: "75px",
    fontSize: "14px",
}

const TABLE_STYLE = {
    textAlign: "center",
    borderCollapse: "collapse",
    marginTop: "15px",
}

const ERROR_BUTTON_STYLE = {
    border: "1px solid red",
    height: "30px",
    fontSize: "12px",
    borderRadius: "5px",
    backgroundColor: "red",
    width: "75px",
}

const PokemonLoadingView = ({ pokemonName }) => {
    const { primaryColor } = useContext(ThemeContext)

    return (
        <PokemonDataView
            {...{
                name: `Loading ${pokemonName.slice(0, 15)}...`,
                number: "xxx",
                imageUrl: null,
                abilities: null,
                imageAlternative: "loading...",
                border: `1px dashed ${primaryColor}`,
            }}
        />
    )
}

const PokemonIdleView = () => {
    const { primaryColor } = useContext(ThemeContext)

    return (
        <PokemonDataView
            {...{
                name: `No Pokemon Yet!`,
                number: "xxx",
                imageUrl: null,
                abilities: null,
                imageAlternative: "Please submit a pokemon!",
                border: `1px dashed ${primaryColor}`,
            }}
        />
    )
}

function PokemonErrorView({ error, resetFunction }) {
    const imageAlternative = (
        <div role="alert" style={{ fontSize: "15px", padding: "10px" }}>
            This error was caught by the error boundary!
            <br />
            <br />
            <span>{error.message}</span>
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <TextButton
                    onClick={resetFunction}
                    style={ERROR_BUTTON_STYLE}
                    isInvertedColor={true}
                >
                    Try again
                </TextButton>
            </div>
        </div>
    )

    return (
        <PokemonDataView
            {...{
                name: "Error! :(",
                number: "xxx",
                imageUrl: null,
                abilities: null,
                imageAlternative,
                border: "1px dashed red",
            }}
        />
    )
}

const PokemonInfoView = ({ pokemonData }) => {
    const { primaryColor } = useContext(ThemeContext)
    return (
        <PokemonDataView {...{ ...pokemonData, border: `1px solid ${primaryColor}` }} />
    )
}

const PokemonCard = ({ children, style }) => {
    const CARD_STYLE = { ...POKEMON_CARD_STYLE, ...style }
    return <div style={CARD_STYLE}>{children}</div>
}

const PokemonDataView = ({
    imageUrl,
    name,
    number,
    abilities,
    imageAlternative,
    border,
}) => {
    /****************
     * DECLARE STYLES
     ****************/
    const IMAGE_STYLE = { ...POKEMON_IMAGE_STYLE, border }
    const TABLE_HEADER_STYLE = { ...ROW_STYLE, fontSize: "18px", borderBottom: border }
    const TABLE_ROW_STYLE = { ...ROW_STYLE, borderBottom: border }

    /****************
     * POKEMON IMAGE COMPONENT
     ****************/
    let image = <div style={IMAGE_STYLE}>{imageAlternative || "..."}</div>
    if (imageUrl) {
        image = <img src={imageUrl} alt={name} height={"200px"} style={IMAGE_STYLE} />
    }

    /****************
     * POKEMON ABILITY TABLE COMPONENT
     ****************/
    let tableBody = (
        <tr>
            <td style={TABLE_ROW_STYLE}>-</td>
            <td style={TABLE_ROW_STYLE}>-</td>
            <td style={TABLE_ROW_STYLE}>-</td>
        </tr>
    )

    if (abilities) {
        tableBody = abilities.map(abilityData => {
            const { name, type, damage } = abilityData
            return (
                <tr key={name}>
                    <td style={TABLE_ROW_STYLE}>{name}</td>
                    <td style={TABLE_ROW_STYLE}>{type}</td>
                    <td style={TABLE_ROW_STYLE}>{damage}</td>
                </tr>
            )
        })
    }

    /****************
     * FINAL LAYOUT
     ****************/
    return (
        <PokemonCard style={{ border }}>
            <PrettyHeader Component="h1" style={{ padding: "15px", fontSize: "40px" }}>
                {name} <sup style={{ fontSize: "20px" }}>({number})</sup>
            </PrettyHeader>
            {image}
            <table style={TABLE_STYLE}>
                <thead>
                    <tr style={TABLE_HEADER_STYLE}>
                        <PrettyHeader Component="th">Ability</PrettyHeader>
                        <PrettyHeader Component="th">Type</PrettyHeader>
                        <PrettyHeader Component="th">Damage</PrettyHeader>
                    </tr>
                </thead>
                <tbody>{tableBody}</tbody>
            </table>
        </PokemonCard>
    )
}

export {
    PokemonIdleView,
    PokemonInfoView,
    PokemonLoadingView,
    PokemonErrorView,
    PokemonCard,
}
