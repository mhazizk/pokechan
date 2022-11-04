import './Styles.css'
import pokeball from '../assets/pokeball.png'
import heightIcon from '../assets/height.png'
import weightIcon from '../assets/weight.png'
import axios from 'axios'
import { useEffect, useState } from 'react'


const PokemonDetails = (props) => {

    // Local State of this component
    const [localState, setLocalState] = useState({
        pokemonName: '',
        artworkURL: '',
        moves:
        {
            sliceEnd: 5,
            moveSelectedName: '',
            moveSelectedDescription: '',
            moveURL: '',
            moveDescription: '',
            moveToggle: 0,
            moveDetails: null
        },
        abilities:
        {
            sliceEnd: 5,
            abilitySelectedName: '',
            abilitySelectedDescription: '',
            abilityURL: '',
            abilityDescription: '',
            abilityToggle: 0,
            abilityDetails: null
        },
        species: {
            speciesDetails: null,
        },
        evolution: {
            evolutionSelected: {
                evolInfo: null
                // [
                //     {
                //         evolURL: null,
                //         evolName: null,
                //         evolArtworkURL: null
                //     }
                // ]
                ,
                isEvolInfoFetched: 0
            },
            evolutionDetails: null
        }
    })


    // ! useEffect Section start //
    // !
    // !


    // useEffect after updating Moves Slice End
    useEffect(() => {
        // refresh the state
        console.log(localState)
    }, [localState.moves.sliceEnd, localState.moves.moveDetails, localState.abilities.abilityDetails])


    // useEffect to hide desc
    useEffect(() => {

        // Fetch Pokemon Species Desc
        getSpeciesDesc()

        // Close all the open card
        setLocalState({
            ...localState,
            'moves': { ...localState.moves, 'moveToggle': 0 },
            'abilities': { ...localState.abilities, 'abilityToggle': 0 }
        })

        // Set default sliceEnd state
        setLocalState({
            ...localState,
            'moves': {
                ...localState.moves,
                'sliceEnd': 5,
                'moveSelectedName': '',
                'moveSelectedDescription': '',
                'moveDescription': '',
                'moveURL': '',
                'moveToggle': 0,
                'moveDetails': null
            },
            'abilities': {
                ...localState.abilities,
                'sliceEnd': 5,
                'abilitySelectedName': '',
                'abilitySelectedDescription': '',
                'abilityDescription': '',
                'abilityURL': '',
                'abilityToggle': 0,
                'abilityDetails': null
            },
            'evolution': {
                ...localState.evolution,
                'evolutionSelected': {
                    ...localState.evolution.evolutionSelected,
                    'evolInfo': null,
                    'isEvolInfoFetched': 0
                }
            }
        })
        console.log(localState)

    }, [props.name])


    // useEffect to show specific ability desc
    useEffect(() => {

        switch (true) {
            case (localState.abilities?.abilityToggle && localState.pokemonName == props.name && localState.abilities?.abilitySelectedDescription == `${localState.abilities.abilitySelectedName}_description`):
                console.log('case 1 ability toggle on, name == description', localState)

                // Clean the previous move state
                setLocalState({
                    ...localState, 'abilities': {
                        ...localState.abilities,
                        'abilityDetails': null
                    }
                })

                getAbilityDesc()

                // Select all ability desc div and hide all
                const selectAllAbilityDesc = document.querySelectorAll(`[data-ability-desc]`)
                selectAllAbilityDesc.forEach((element) => element.style.display = 'none')

                if (localState.abilities?.abilitySelectedName && localState.abilities?.abilitySelectedDescription == `${localState.abilities.abilitySelectedName}_description`) {
                    // Select only chosen ability to be shown
                    const displaySelectedAbilityOnly = document?.querySelector(`[data-ability-desc='${localState.abilities.abilitySelectedDescription}']`)
                    displaySelectedAbilityOnly.style.display = 'flex'
                    console.log('case 1 ability toggle on, name == description, show div', localState)
                }
                break;

            case !localState.abilities.abilityToggle && localState.pokemonName != props.name:
                console.log('case special' + localState)
                break;

            case !localState.abilities.abilityToggle && !localState.abilities.abilitySelectedName:
                // do nothing
                console.log('case 2 ability')
                break;

            case !localState.abilities.abilityToggle && !localState.abilities.abilitySelectedName:
                // do nothing
                console.log('case 3 ability')
                break;

            default:
                break;
        }

    }, [localState.abilities.abilityURL, localState.abilities.abilitySelectedName, localState.abilities.abilitySelectedDescription])



    // useEffect to show specific move desc
    useEffect(() => {

        switch (true) {
            case (localState.moves?.moveToggle && localState.pokemonName == props.name && localState.moves?.moveSelectedDescription == `${localState.moves.moveSelectedName}_description`):
                console.log('case 1 moves, toggle on, name == description')

                // Clean the previous move state
                setLocalState({
                    ...localState, 'moves': {
                        ...localState.moves,
                        'moveDetails': null
                    }
                })

                getMoveDesc()

                // Select all move desc div and hide all
                const selectAllMoveDesc = document.querySelectorAll(`[data-move-desc]`)
                selectAllMoveDesc.forEach((element) => element.style.display = 'none')

                if (localState.moves?.moveSelectedName && localState.moves?.moveSelectedDescription == `${localState.moves.moveSelectedName}_description`) {
                    // Select only chosen move to be shown
                    const displaySelectedMoveOnly = document.querySelector(`[data-move-desc='${localState.moves.moveSelectedDescription}']`)
                    displaySelectedMoveOnly.style.display = 'flex'
                    console.log('case 1 moves, toggle on, name == description, show div')
                }
                break;

            case !localState.moves.moveToggle && localState.pokemonName != props.name:
                console.log('case special' + localState)
                break;


            case !localState.moves.moveToggle && !localState.moves.moveSelectedName:
                // do nothing
                console.log('case 2 moves')
                break;

            case !localState.moves.moveToggle && !localState.moves.moveSelectedName:
                // do nothing
                console.log('case 3 moves')

                break;

            default:
                break;
        }

    }, [localState.moves.moveURL, localState.moves.moveSelectedName])


    // useEffect Toggle
    useEffect(() => {
        // refresh

        // Hide all Move Desc
        const selectAllMoveDesc = document.querySelectorAll(`[data-move-desc]`)
        selectAllMoveDesc.forEach((element) => element.style.display = 'none')

        console.log(localState)
    }, [localState.moves.moveToggle])


    // useEffect Toggle
    useEffect(() => {
        // refresh

        // Hide all Ability Desc
        const selectAllAbilityDesc = document.querySelectorAll(`[data-ability-desc]`)
        selectAllAbilityDesc.forEach((element) => element.style.display = 'none')

        console.log(localState)
    }, [localState.abilities.abilityToggle])


    // useEffect activate function
    useEffect(() => {
        // refresh state
        if (localState.species?.speciesDetails?.evolution_chain.url) {
            getEvolDesc()
        }
    }, [localState.species?.speciesDetails])


    // useEffect sliceEnd
    useEffect(() => {
        // refresh
    }, [localState.moves.sliceEnd, localState.abilities.sliceEnd])

    // useEffect activate function
    useEffect(() => {
        // refresh state
        // console.log(localState)
        findEvol()
    }, [localState.evolution?.evolutionDetails])


    // useEffect activate function
    useEffect(() => {
        // refresh state
        // console.log(localState)
        if (localState.evolution?.evolutionSelected?.evolInfo) {
            getEvolArtworkURL()
            console.log(localState)
        }
    }, [localState.evolution?.evolutionSelected?.evolInfo])


    // useEffect refresh state
    useEffect(() => {
        // refresh
    }, [localState.evolution?.evolutionSelected?.isEvolInfoFetched, localState.pokemonName])


    // !
    // !
    // ! End of useEffect section





    // ! Fetching Section start //
    // !
    // !

    // Fetch evolution chain details
    const getEvolDesc = async () => {
        try {
            const res = await axios.get(localState.species?.speciesDetails.evolution_chain.url)
            setLocalState({ ...localState, 'evolution': { ...localState.evolution, 'evolutionDetails': res.data } })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }


    // Fetch Evolution Artwork from Local State of Evol URL
    const getEvolArtworkURL = async () => {
        localState.evolution?.evolutionSelected?.evolInfo?.forEach(async (object) => {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${object.evolName}`)
                console.log(res?.data?.sprites?.other['official-artwork']?.front_default)
                object.evolArtworkURL = res?.data?.sprites?.other['official-artwork']?.front_default
                setLocalState({ ...localState, 'evolution': { ...localState.evolution, 'evolutionSelected': { ...localState.evolution.evolutionSelected, 'isEvolInfoFetched': 1 } } })
            } catch (error) {
                console.log(error)
            }
        })
    }


    // Fetch Move Description Text
    const getMoveDesc = async () => {
        try {
            if (localState.moves?.moveURL && localState.moves?.moveSelectedName) {
                const res = await axios.get(localState.moves?.moveURL)
                setLocalState({ ...localState, 'moves': { ...localState.moves, 'moveDetails': res.data } })
                console.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }


    // Fetch Ability Description Text
    const getAbilityDesc = async () => {
        try {
            if (localState.abilities?.abilityURL && localState.abilities?.abilitySelectedName) {
                const res = await axios.get(localState.abilities?.abilityURL)
                setLocalState({ ...localState, 'abilities': { ...localState.abilities, 'abilityDetails': res.data } })
                console.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }


    // Fetch Species Description Text
    const getSpeciesDesc = async () => {
        try {
            if (props.name) {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${props.name}`)
                setLocalState({ ...localState, 'species': { ...localState.species, 'speciesDetails': res.data } })
                console.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // !
    // !
    // ! End of Fetching Section //


    // ! Function Section start //
    // !
    // !

    // Find Pokemon Evolution Name
    const findEvol = () => {

        const evolInfo = []

        // Get the lowest evolution name
        const lowestEvolName = localState.evolution?.evolutionDetails?.chain?.species?.name
        const lowestEvolURL = localState.evolution?.evolutionDetails?.chain?.species?.url

        evolInfo.push({
            'evolName': lowestEvolName,              // Push first name in first object
            'evolURL': lowestEvolURL,                // Push first URL in first object
            'evolArtworkURL': null                   // Make a slot for first artwork URL in first object
        })


        if (localState.evolution?.evolutionDetails) {
            const findEvol = localState.evolution?.evolutionDetails?.chain?.evolves_to.filter((findName) => {
                evolInfo.push({
                    'evolName': findName?.species?.name,  // Push first name in second object
                    'evolURL': findName?.species?.url,    // Push first URL in second object
                    'evolArtworkURL': null                // Make a slot for second artwork URL in second object
                })

                return (
                    findName.evolves_to?.filter((findName) => {
                        evolInfo.push({
                            'evolName': findName?.species?.name,  // Push third name in third object
                            'evolURL': findName?.species?.url,    // Push third URL in third object
                            'evolArtworkURL': null                // Make a slot for third artwork URL in third object

                        })
                        return (
                            findName.evolves_to?.filter((findName) => {
                                evolInfo.push({
                                    'evolName': findName?.species?.name,  // Push forth name in forth object
                                    'evolURL': findName?.species?.url,    // Push forth URL in forth object
                                    'evolArtworkURL': null                // Make a slot for forth artwork URL in forth object

                                })
                                return
                            })

                        )
                    })
                )
            })

            console.log(evolInfo)
            setLocalState({
                ...localState,
                'evolution': {
                    ...localState.evolution,
                    'evolutionSelected': {
                        ...localState.evolution.evolutionSelected,
                        'evolInfo': evolInfo
                    }
                }
            })
            console.log(localState)

        }

    }

    // !
    // !
    // ! End of Function Section //

    // ! Variable Section start //
    // !
    // !

    // Filter Flavor Text by language EN
    const filterSpeciesFlavorTexEN = localState.species?.speciesDetails?.flavor_text_entries.filter((text) => { return text.language.name.includes('en') })
    const filterAbilityFlavorTexEN = localState.abilities?.abilityDetails?.flavor_text_entries.filter((text) => { return text.language.name.includes('en') })
    const filterMoveFlavorTexEN = localState.moves?.moveDetails?.flavor_text_entries.filter((text) => { return text.language.name.includes('en') })


    // Get Image
    const getArtwork = props.details?.sprites?.other['official-artwork']?.front_default;
    const getSpritesFrontDefault = props.details?.sprites?.front_default;
    const getSpritesBackDefault = props.details?.sprites?.back_default;


    // ! 
    // ! 
    // ! End of Variable Section //


    // ! Return Render Section start //
    return (
        <>
            {/* // ! Root Div of Pokemon Details Component */}

            <div className='root_row_container' style={{ 'display': `${props.name ? 'flex' : 'none'}`, 'height': 'auto',  'justifyContent': 'space-between', 'alignItems': 'flex-start' }}>


                {/* //! Left Column Section of Pokemon Details Component */}
                <div id='main_container' className='root_column' style={{ 'zIndex': '', 'overflow': 'visible', 'height': 'auto', 'width': '100%', 'margin': '8px', 'gap': '16px' }}>

                    {/* // * Pokemon Image Section */}
                    <div id='section_cointainer' className='root_column' style={{ 'position': 'relative', 'top': '0', 'zIndex': '400', 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Artwork Name */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'alignItems': 'center', 'overflow': 'visible' }}>
                            <img src={getArtwork ? getArtwork : null} className='artwork' style={{ 'display': `${getArtwork ? 'flex' : 'none'}` }} alt={props.name} />
                        </div>
                    </div>


                    {/* // * Pokemon Sprites Section */}
                    {/* <div id='section_cointainer' className='root_column' style={{ 'zIndex': '400', 'height': 'auto', 'width': '100%', 'gap': '4px' }}> */}

                    {/* Pokemon Sprites Name */}
                    {/* <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-evenly', 'overflow': 'visible' }}>
                            <img src={getSpritesFrontDefault ? getSpritesFrontDefault : null} className='artwork' style={{ 'display': `${getSpritesFrontDefault ? 'flex' : 'none'}`, 'width': '64px' }} alt={props.name} />
                            <img src={getSpritesBackDefault ? getSpritesBackDefault : null} className='artwork' style={{ 'display': `${getSpritesBackDefault ? 'flex' : 'none'}`, 'width': '64px' }} alt={props.name} />
                        </div>
                    </div> */}


                    {/* // * Pokemon Physical Info Section */}
                    <div id='section_container' className='root_column' style={{ 'zIndex': '400', 'height': 'auto', 'width': '100%', 'gap': '4px' }}>
                        <div className='root_row' style={{ 'height': 'auto', 'width': '50%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>

                            {/* Pokemon Height */}
                            <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap':'8px','alignItems': 'center' }}>
                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>
                                    <img src={heightIcon} className='icon' alt="" />
                                </div>
                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>
                                    <p className='font_body' style={{'fontWeight':'bold'}}>Height</p>
                                </div>
                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>
                                    <p className='font_body'>{props.details?.height ? (props.details?.height / 10).toLocaleString() : '???' } m</p>
                                </div>
                            </div>

                            {/* Pokemon Weight */}
                            <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap':'8px','alignItems': 'center' }}>
                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>
                                    <img src={weightIcon} className='icon' alt="" />
                                </div>
                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>
                                    <p className='font_body' style={{'fontWeight':'bold'}}>Weight</p>
                                </div>
                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>
                                    <p className='font_body'>{props.details?.weight ? (props.details?.weight / 10).toLocaleString() : '???' } kg</p>
                                </div>
                            </div>
                        </div>


                        {/* // * Pokemon Physical Info Section */}
                        {/* <div id='section_cointainer' className='root_column' style={{ 'zIndex': '400', 'height': 'auto', 'width': '100%', 'gap': '4px' }}> */}

                        {/* Pokemon Physical Title */}
                        {/* <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'alignItems': 'flex-start' }}>
                            <p className='font_head'>Physical Info</p>
                        </div> */}
                        {/* Height Row */}
                        {/* < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}> */}

                        {/* Pokemon Stats Name */}
                        {/* <div className='root_row' style={{ 'height': 'auto', 'width': '50%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                <img src={pokeball} className='icon' alt="" />
                                <p className='font_body'>Height</p>
                            </div> */}

                        {/* Pokemon Base Stats */}
                        {/* <div className='root_column' style={{ 'height': 'auto', 'width': '50%' }}>
                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                    <p className='font_body'>{(props.details?.height / 10).toLocaleString()} m</p>
                                </div>
                            </div>
                        </div> */}

                        {/* Weight Row */}
                        {/* < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}> */}

                        {/* Pokemon Weight Name */}
                        {/* <div className='root_row' style={{ 'height': 'auto', 'width': '50%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                <img src={pokeball} className='icon' alt="" />
                                <p className='font_body'>Weight</p>
                            </div> */}

                        {/* Pokemon Weight Stats */}
                        {/* <div className='root_column' style={{ 'height': 'auto', 'width': '50%' }}>
                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                    <p className='font_body'>{(props.details?.weight / 10).toLocaleString()} kg</p>
                                </div>
                            </div>
                        </div> */}
                    </div>


                    {/* // * Pokemon Evolution Info Section */}
                    <div id='section_cointainer' className='root_column' style={{ 'zIndex': '400', 'overflow': 'auto', 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Evolution Title */}
                        <div className='root_column' style={{ 'display': `${localState.evolution?.evolutionSelected?.isEvolInfoFetched ? 'flex' : 'none'}`, 'overflow': 'auto', 'height': 'auto', 'width': '100%', 'alignItems': 'center' }}>
                            <p className='font_head'>Evolution</p>
                        </div>

                        {/*  Pokemon Evolution into Grid */}
                        <div className='grid'>
                            {/* <div className='root_column_evolution' style={{ 'overflow': 'auto', 'height': 'auto', 'width': '100%', 'justifyContent': 'space-evenly', 'overflow': 'visible' }}> */}
                            {localState.evolution?.evolutionSelected?.isEvolInfoFetched ?
                                localState.evolution?.evolutionSelected?.evolInfo?.map((item) => {
                                    return (
                                        <>
                                            <div className='root_column' key={item.evolName} style={{ 'overflow': 'visible', 'height': 'auto', 'width': '100%', 'alignItems': 'center' }}>
                                                <img src={item.evolArtworkURL} className='artwork' style={{ 'display': `${item ? 'flex' : 'none'}`, 'overflow': 'visible', 'width': '96px' }} alt={props.name} />
                                                <br />
                                                {(item.evolName[0].toUpperCase() + item.evolName.substring(1))}
                                            </div>
                                        </>
                                    )
                                }) : null
                            }
                            {/* </div> */}
                        </div>

                        {/* Pokemon Evolution Flexbox */}
                        {/* <div className='root_column' style={{ 'overflow': 'auto', 'height': 'auto', 'width': '100%', 'alignItems': 'flex-start' }}>
                            <div className='root_column_evolution' style={{ 'overflow': 'auto', 'height': 'auto', 'width': '100%', 'justifyContent': 'space-evenly', 'overflow': 'visible' }}>
                                {localState.evolution?.evolutionSelected?.isEvolInfoFetched ?
                                    localState.evolution?.evolutionSelected?.evolInfo?.map((item) => {
                                        return (
                                            <>
                                                <div className='root_column' key={item.evolName} style={{ 'overflow': 'auto', 'height': 'auto', 'width': '100%', 'alignItems': 'center' }}>
                                                    <img src={item.evolArtworkURL} className='artwork' style={{ 'display': `${item ? 'flex' : 'none'}`, 'overflow': 'auto', 'width': '96px' }} alt={props.name} />
                                                    <br />
                                                    {(item.evolName[0].toUpperCase() + item.evolName.substring(1))}
                                                </div>
                                            </>
                                        )
                                    }) : null
                                }
                            </div>
                        </div> */}
                    </div>



                </div>





                {/* //! Middle Column Section of Pokemon Details Component */}
                <div id='main_container' className='root_column' style={{ 'zIndex': '100', 'height': 'auto', 'width': '100%', 'margin': '8px', 'gap': '16px' }}>

                    {/* // * Pokemon Title Section */}
                    <div id='section_container' className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Title Name */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'alignItems': 'flex-start' }}>
                            <p className='font_head'>{props.name[0]?.toUpperCase() + props.name?.substring(1)}</p>
                        </div>

                        {/* Pokemon Type */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%' }}>
                            <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                <img src={pokeball} className='icon' alt="" /> Types
                                <p className='span_tag'>
                                    {props.details?.types.map((list) => { return (list.type.name[0].toUpperCase() + list.type.name?.substring(1)) }).join(" ")}
                                </p>
                            </div>
                        </div>

                        {/* Pokemon Weakness */}
                        {/* <div className='root_column' style={{ 'height': 'auto', 'width': '100%' }}>
                            <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                <img src={pokeball} className='icon' alt="" /> Weakness
                            </div>
                        </div> */}
                    </div>


                    {/* // * Pokemon Flavor Text Section */}
                    <div id='section_container' className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Text Description */}
                        <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '0px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                            <p className='font_body'>
                                {filterSpeciesFlavorTexEN?.slice(0, 1).map((text) => { return text.flavor_text })}
                            </p>
                        </div>
                    </div>


                    {/* // * Pokemon Stats Section */}
                    <div id='section_container' className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Stats Title */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'alignItems': 'flex-start' }}>
                            <p className='font_head'>Stats</p>
                        </div>

                        {/* Pokemon Stats Table */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                            {/* Header Row */}
                            < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}>

                                {/* Pokemon Stats Name */}
                                <div className='root_row' style={{ 'height': 'auto', 'width': '50%', 'gap': '8px', 'whiteSpace':'nowrap','justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                    <p className='font_body' style={{'fontWeight':'bold'}}>Stats of {props.name[0]?.toUpperCase() + props.name?.substring(1)}</p>

                                </div>

                                {/* Pokemon Base Stats */}
                                <div className='root_column' style={{ 'height': 'auto', 'width': '25%'}}>
                                    <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>
                                        <p className='span_tag'>
                                            Base
                                        </p>
                                    </div>
                                </div>

                                {/* Pokemon Effort Stats */}
                                <div className='root_column' style={{ 'height': 'auto', 'width': '25%' }}>
                                    <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>
                                        <p className='span_tag'>
                                            Effort
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Exp Row */}
                            < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}>

                                {/* Pokemon Stats Name */}
                                <div className='root_row' style={{ 'height': 'auto', 'width': '50%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                    <img src={pokeball} className='icon' alt="" />
                                    <p className='font_body'>Exp</p>
                                </div>

                                {/* Pokemon Base Stats */}
                                <div className='root_column' style={{ 'height': 'auto', 'width': '25%' }}>
                                    <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>
                                        <p className='font_body'>{props.details?.base_experience}</p>
                                    </div>
                                </div>

                                {/* Pokemon Effort Stats */}
                                <div className='root_column' style={{ 'height': 'auto', 'width': '25%' }}>
                                    <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>
                                        <p className='font_body'>-</p>
                                    </div>
                                </div>
                            </div>


                            {/* Map the stats list */}
                            {props.details?.stats?.map((list) => {
                                return (
                                    <>
                                        {/* HP Row */}
                                        < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}>

                                            {/* Pokemon Stats Name */}
                                            <div className='root_row' style={{ 'whiteSpace': 'nowrap', 'height': 'auto', 'width': '50%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                                <img src={pokeball} className='icon' alt="" />
                                                <p className='font_body'>
                                                    {(list.stat?.name?.split("-").map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" "))}
                                                </p>
                                            </div>

                                            {/* Pokemon Base Stats */}
                                            <div className='root_column' style={{ 'height': 'auto', 'width': '25%' }}>
                                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>
                                                    <p className='font_body'>{list.base_stat}</p>
                                                </div>
                                            </div>

                                            {/* Pokemon Effort Stats */}
                                            <div className='root_column' style={{ 'height': 'auto', 'width': '25%' }}>
                                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>
                                                    <p className='font_body'>{list.effort ? list.effort : '-'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}

                        </div>
                    </div>
                </div>



                {/* //! Right Column Section of Pokemon Details Component */}
                <div id='main_container' className='root_column' style={{ 'zIndex': '999', 'overflow': 'visible', 'height': 'auto','width': '95%', 'margin': '8px', 'gap': '16px' }}>


                    {/* // * Pokemon Abilities Info Section */}
                    <div id='section_container' className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Abilities Title */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'alignItems': 'flex-start' }}>
                            <p className='font_head'>Abilities</p>
                        </div>

                        {/* Height Row */}
                        {/* < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}> */}
                        <div className='root_column' style={{ 'height': 'auto', 'gap': '4px','width': '100%' }}>


                            {/* Map the abilities list */}
                            {props.details?.abilities?.slice(0, localState?.abilities?.sliceEnd).map((list) => {
                                return (
                                    <>

                                        {/* Abilities list map column container */}
                                        <div
                                            className='toggle_column'
                                            data-name={list.ability.name}
                                            data-url={list.ability.url}
                                            onClick={
                                                (e) => {
                                                    setLocalState({
                                                        ...localState,
                                                        'pokemonName': props.name,
                                                        'abilities': {
                                                            ...localState.abilities,
                                                            'abilitySelectedName': e.currentTarget.getAttribute('data-name'),
                                                            'abilitySelectedDescription': `${e.currentTarget.getAttribute('data-name')}_description`,
                                                            'abilityURL': e.currentTarget.getAttribute('data-url'),
                                                            'abilityToggle': 1,
                                                        }
                                                    })
                                                }
                                            }
                                            style={{ 'height': 'auto', 'gap': '4px', 'padding': '4px' ,'width': '100%', 'cursor': 'pointer' }}>


                                            {/* Abilities Row */}
                                            < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between'}}>

                                                {/* Pokemon Abilities Name */}
                                                <div className='root_row' style={{ 'whiteSpace': 'nowrap','height': 'auto', 'width': 'auto', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                                    <img src={pokeball} className='icon' alt="" />
                                                    <p className='font_body'>
                                                        {(list.ability?.name?.split("-").map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" "))}
                                                    </p>
                                                </div>

                                                {/* Toggle */}
                                                <div className='root_row' style={{ 'whiteSpace': 'nowrap', 'height': 'auto', 'width': 'auto', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                                    <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-end', 'alignItems': 'center' }}>
                                                        <p className='font_body_link' style={{ 'whiteSpace': 'nowrap' }}>•••</p>
                                                    </div>
                                                </div>

                                            </div>
                                            {/* Ability Description Row */}

                                            < div
                                                data-ability-desc={`${list.ability?.name}_description`}
                                                className='root_column'
                                                style={{ 'display': 'none', 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start' }}>

                                                < div
                                                    className='root_row'
                                                    style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'flex-start' }}>
                                                    {filterAbilityFlavorTexEN?.slice(0, 1).map((text) => { return text.flavor_text })}
                                                </div>


                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            )
                            }


                            {/* Show More Abilities Section */}
                            < div
                                onClick={() => {
                                    props.details?.abilities && props.details?.abilities.length > 5 && props.details?.abilities.length != localState.abilities.sliceEnd ?
                                        setLocalState({ ...localState, 'abilities': { ...localState.abilities, 'sliceEnd': props.details?.abilities?.length } }) :
                                        setLocalState({ ...localState, 'abilities': { ...localState.abilities, 'sliceEnd': 5 } })
                                }}
                                className='root_row'
                                style={{ 'display': `${props.details?.abilities?.length > localState.abilities?.sliceEnd ? 'flex' : 'none'}`, 'height': 'auto', 'width': '100%', 'justifyContent': 'center' }}>
                                <p
                                    className='font_body_link'
                                    style={{ 'whiteSpace': 'nowrap' }}>
                                    {props.details?.abilities && props.details?.abilities.length > 5 && props.details?.abilities.length != localState.abilities.sliceEnd ?
                                        `Show all ${props.details?.abilities?.length} abilities ▼` :
                                        `Hide abilities ▲`
                                    }
                                </p>
                            </div>

                        </div>
                    </div>


                    {/* // * Pokemon Moves Info Section */}
                    <div id='section_container' className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Moves Title */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'alignItems': 'flex-start' }}>
                            <p className='font_head'>Moves</p>
                        </div>

                        {/* Height Row */}
                        {/* < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}> */}
                        <div className='root_column' style={{ 'height': 'auto', 'gap': '0px', 'width': '100%' }}>


                            {/* Map the moves list */}
                            {props.details?.moves?.slice(0, localState?.moves?.sliceEnd).map((list) => {
                                return (
                                    <>
                                        {/* Stats list map column container */}
                                        <div
                                            className='toggle_column'
                                            data-name={list.move.name}
                                            data-url={list.move.url}
                                            onClick={
                                                (e) => {
                                                    setLocalState({
                                                        ...localState,
                                                        'pokemonName': props.name,
                                                        'moves': {
                                                            ...localState.moves,
                                                            'moveToggle': 1,
                                                            'moveSelectedName': e.currentTarget.getAttribute('data-name'),
                                                            'moveSelectedDescription': `${e.currentTarget.getAttribute('data-name')}_description`,
                                                            'moveURL': e.currentTarget.getAttribute('data-url')
                                                        }
                                                    })
                                                }
                                            }
                                            style={{ 'height': 'auto', 'gap': '4px', 'padding': '4px 0','width': '100%' }}>

                                            {/* Stats Name Row */}
                                            < div
                                                className='root_row'
                                                style={{ 'cursor': 'pointer', 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}>

                                                {/* Pokemon Stats Name */}
                                                <div className='root_row' style={{ 'whiteSpace': 'nowrap', 'height': 'auto', 'width': 'auto', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                                    <img src={pokeball} className='icon' alt="" />
                                                    <p className='font_body'>
                                                        {(list.move?.name?.split("-").map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" "))}
                                                    </p>
                                                </div>

                                                {/* Toggle */}
                                                <div className='root_row' style={{ 'whiteSpace': 'nowrap', 'height': 'auto', 'width': '100%', 'gap': '0', 'justifyContent': 'flex-end', 'alignItems': 'center' }}>
                                                    <div className='root_row' style={{ 'height': 'auto', 'width': 'auto', 'gap': '0', 'justifyContent': 'flex-end', 'alignItems': 'center' }}>
                                                        <p className='font_body_link' style={{ 'whiteSpace': 'nowrap' }}>•••</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Stats Description Row */}

                                            < div
                                                data-move-desc={`${list.move.name}_description`}
                                                className='root_column'
                                                style={{ 'display': 'none', 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start' }}>

                                                < div
                                                    className='root_row'
                                                    style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'flex-start' }}>
                                                    {filterMoveFlavorTexEN?.slice(0, 1).map((text) => { return text.flavor_text })}
                                                </div>


                                                < div
                                                    className='root_row'
                                                    style={{ 'backgroundColor': 'rgba(0, 0, 0, 0.05)', 'padding': '4px 0', 'height': 'auto', 'width': '100%', 'justifyContent': 'space-evenly' }}>
                                                    < div
                                                        className='root_column'
                                                        style={{ 'height': 'auto', 'width': 'auto', 'gap': '8px', 'justifyContent': 'center', 'textAlign': 'center', 'alignContent': 'center', 'alignItems': 'center' }}>
                                                        {localState.moves?.moveDetails?.accuracy ? localState.moves?.moveDetails?.accuracy : '-'}
                                                        <br />
                                                        Accuracy
                                                    </div>
                                                    < div
                                                        className='root_column'
                                                        style={{ 'height': 'auto', 'width': 'auto', 'gap': '8px', 'justifyContent': 'center', 'textAlign': 'center', 'alignContent': 'center', 'alignItems': 'center' }}>
                                                        {localState.moves?.moveDetails?.power ? localState.moves?.moveDetails?.power : '-'}
                                                        <br />
                                                        Power
                                                    </div>
                                                    < div
                                                        className='root_column'
                                                        style={{ 'height': 'auto', 'width': 'auto', 'gap': '8px', 'justifyContent': 'center', 'textAlign': 'center', 'alignContent': 'center', 'alignItems': 'center' }}>
                                                        {localState.moves?.moveDetails?.priority ? localState.moves?.moveDetails?.priority : '-'}
                                                        <br />
                                                        Priority
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            )
                            }


                            {/* Show More Moves Section */}
                            < div
                                onClick={() => {
                                    props.details?.moves && props.details?.moves.length > 5 && props.details?.moves.length != localState.moves.sliceEnd ?
                                        setLocalState({ ...localState, 'moves': { ...localState.moves, 'sliceEnd': props.details?.moves?.length } }) :
                                        setLocalState({ ...localState, 'moves': { ...localState.moves, 'sliceEnd': 5 } })
                                }}
                                className='root_row'
                                style={{ 'display': `${props.details?.moves?.length >= localState.moves?.sliceEnd ? 'flex' : 'none'}`, 'position': 'sticky', 'bottom': '0', 'padding': '4px', 'height': 'auto', 'width': '100%', 'justifyContent': 'center' }}>
                                <p
                                    className='font_body_link'
                                    style={{ 'whiteSpace': 'nowrap' }}>
                                    {props.details?.moves && props.details?.moves.length > 5 && props.details?.moves.length != localState.moves.sliceEnd ?
                                        `Show all ${props.details?.moves?.length} moves ▼` :
                                        `Hide moves ▲`
                                    }
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}

export default PokemonDetails