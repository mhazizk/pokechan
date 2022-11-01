import './Styles.css'
import pokeball from '../assets/pokeball.png'
import axios from 'axios'
import { useEffect, useState } from 'react'
import LoadingScreen from './Loading'

const PokemonDetailsPage = (props) => {

    const [localState, setLocalState] = useState({
        artworkURL: '',
        moves:
        {
            sliceEnd: 5,
            moveSelectedName: '',
            moveSelectedDescription: '',
            moveURL: '',
            moveDescription: '',
            moveDetails: null
        },
        abilities:
        {
            sliceEnd: 5,
            abilitySelectedName: '',
            abilitySelectedDescription: '',
            abilityURL: '',
            abilityDescription: '',
            abilityDetails: null
        },
        species: {
            speciesDetails: null
        }
    })


    // const axios = require('axios').default
    // const getImage = async () => {
    //     try {
    //         const res = await axios.get(props.details?.sprites?.official-artwork?.front_default)
    //         setDetails({...details, 'artworkURL':''})
    //         // setData({ ...data, 'database': { ...data.database, 'nameList': res.data.results } })
    //         console.log(res)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // Toggle Moves Section
    // const onClickMovesToggle = (props) => {
    //     localState.moves?.sliceEnd == 5 ?
    //         setLocalState({ ...localState, 'moves': { ...localState.moves, 'sliceEnd': props } }) :
    //         setLocalState({ ...localState, 'moves': { ...localState.moves, 'sliceEnd': 5 } })

    // }


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



    // useEffect after updating Moves Slice End
    useEffect(() => {
        // refresh the state
        console.log(localState)
    }, [localState.moves.sliceEnd, localState.moves.moveDetails, localState.abilities.abilityDetails])


    // useEffect to hide desc
    useEffect(() => {

        // Hide all Move Desc
        const selectAllMoveDesc = document.querySelectorAll(`[data-move-desc]`)
        selectAllMoveDesc.forEach((element) => element.style.display = 'none')

        // Hide all Ability Desc
        const selectAllAbilityDesc = document.querySelectorAll(`[data-ability-desc]`)
        selectAllAbilityDesc.forEach((element) => element.style.display = 'none')


        // Fetch Pokemon Species Desc
        getSpeciesDesc()

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
                'moveDetails': null
            },
            'abilities': {
                ...localState.abilities,
                'sliceEnd': 5,
                'abilitySelectedName': '',
                'abilitySelectedDescription': '',
                'abilityDescription': '',
                'abilityURL': '',
                'abilityDetails': null
            }
        })

    }, [props.name])


    // useEffect to show specific move desc
    useEffect(() => {

        if (localState.abilities?.abilitySelectedName) {

            getAbilityDesc()

            // Select all ability desc div and hide all
            const selectAllAbilityDesc = document.querySelectorAll(`[data-ability-desc]`)
            selectAllAbilityDesc.forEach((element) => element.style.display = 'none')

            // Select only chosen ability to be shown
            const displaySelectedAbilityOnly = document.querySelector(`[data-ability-desc='${localState.abilities.abilitySelectedDescription}']`)
            displaySelectedAbilityOnly.style.display = 'flex'

        }
    }, [localState.abilities.abilityURL, localState.abilities.abilitySelectedName, localState.abilities.abilitySelectedDescription])


    // useEffect to show specific move desc
    useEffect(() => {
        // refresh the state
        if (localState.moves?.moveSelectedName) {

            getMoveDesc()

            // Select all move desc div and hide all
            const selectAllMoveDesc = document.querySelectorAll(`[data-move-desc]`)
            selectAllMoveDesc.forEach((element) => element.style.display = 'none')

            // Select only chosen move to be shown
            const displaySelectedMoveOnly = document.querySelector(`[data-move-desc='${localState.moves.moveSelectedDescription}']`)
            displaySelectedMoveOnly.style.display = 'flex'

        }

    }, [localState.moves.moveURL, localState.moves.moveSelectedName])


    // useEffect refresh
    useEffect(() => {
        // refresh state
    }, [localState.species?.speciesDetails])


    // Filter Ability Text by language EN
    const filterSpeciesFlavorTexEN = localState.species?.speciesDetails?.flavor_text_entries.filter((text) => { return text.language.name.includes('en') })

    // Filter Ability Text by language EN
    const filterAbilityFlavorTexEN = localState.abilities?.abilityDetails?.flavor_text_entries.filter((text) => { return text.language.name.includes('en') })
    // console.log(filterMoveFlavorTexEN)

    // Filter Move Text by language EN
    const filterMoveFlavorTexEN = localState.moves?.moveDetails?.flavor_text_entries.filter((text) => { return text.language.name.includes('en') })


    const getArtwork = props.details?.sprites?.other['official-artwork']?.front_default;
    const getSpritesFrontDefault = props.details?.sprites?.front_default;
    const getSpritesBackDefault = props.details?.sprites?.back_default;
    // console.log(getSpritesBackDefault)

    // console.log(props.name)
    return (
        <>
            <div className='root_row' style={{ 'display': `${props.name ? 'flex' : 'none'}`, 'height': 'auto', 'width': '1024px', 'justifyContent': 'space-between', 'alignItems': 'flex-start' }}>


                {/* Left Column */}
                <div id='main_container' className='root_column' style={{ 'zIndex': '', 'overflow': 'visible', 'height': 'auto', 'width': '100%', 'margin': '8px', 'gap': '16px' }}>

                    {/* Pokemon Image Section */}
                    <div id='section_cointainer' className='root_column' style={{ 'position': 'sticky', 'top': '0', 'zIndex': '1002', 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Artwork Name */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'alignItems': 'center', 'overflow': 'visible' }}>
                            <img src={getArtwork ? getArtwork : null} className='artwork' style={{ 'display': `${getArtwork ? 'flex' : 'none'}` }} alt={props.name} />
                        </div>
                    </div>


                    {/* Pokemon Sprites Section */}
                    <div id='section_cointainer' className='root_column' style={{ 'zIndex': '400', 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Sprites Name */}
                        <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-evenly', 'overflow': 'visible' }}>
                            <img src={getSpritesFrontDefault ? getSpritesFrontDefault : null} className='artwork' style={{ 'display': `${getSpritesFrontDefault ? 'flex' : 'none'}`, 'width': '64px' }} alt={props.name} />
                            <img src={getSpritesBackDefault ? getSpritesBackDefault : null} className='artwork' style={{ 'display': `${getSpritesBackDefault ? 'flex' : 'none'}`, 'width': '64px' }} alt={props.name} />
                        </div>
                    </div>

                    {/* Pokemon Physical Info */}
                    <div id='section_cointainer' className='root_column' style={{ 'zIndex': '400', 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Physical Title */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'alignItems': 'flex-start' }}>
                            <p className='font_head'>Physical Info</p>
                        </div>

                        {/* Height Row */}
                        < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}>

                            {/* Pokemon Stats Name */}
                            <div className='root_row' style={{ 'height': 'auto', 'width': '50%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                <img src={pokeball} className='icon' alt="" />
                                <p className='font_body'>Height</p>
                            </div>

                            {/* Pokemon Base Stats */}
                            <div className='root_column' style={{ 'height': 'auto', 'width': '50%' }}>
                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                    <p className='font_body'>{(props.details?.height / 10).toLocaleString()} m</p>
                                </div>
                            </div>
                        </div>

                        {/* Weight Row */}
                        < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}>

                            {/* Pokemon Weight Name */}
                            <div className='root_row' style={{ 'height': 'auto', 'width': '50%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                <img src={pokeball} className='icon' alt="" />
                                <p className='font_body'>Weight</p>
                            </div>

                            {/* Pokemon Weight Stats */}
                            <div className='root_column' style={{ 'height': 'auto', 'width': '50%' }}>
                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                    <p className='font_body'>{(props.details?.weight / 10).toLocaleString()} kg</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Pokemon Sprites Info */}
                    <div id='section_cointainer' className='root_column' style={{ 'zIndex': '400', 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Sprites Title */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'alignItems': 'flex-start' }}>
                            <p className='font_head'>Sprites</p>
                        </div>

                        {/* Height Row */}
                        < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}>

                            {/* Pokemon Stats Name */}
                            <div className='root_row' style={{ 'height': 'auto', 'width': '50%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                <img src={pokeball} className='icon' alt="" />
                                <p className='font_body'>Height</p>
                            </div>

                            {/* Pokemon Base Stats */}
                            <div className='root_column' style={{ 'height': 'auto', 'width': '50%' }}>
                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                    <p className='font_body'>{(props.details?.height / 10).toLocaleString()} m</p>
                                </div>
                            </div>
                        </div>

                        {/* Weight Row */}
                        < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}>
                        </div>
                    </div>



                </div>





                {/* Middle Column */}
                <div id='main_container' className='root_column' style={{ 'zIndex': '3', 'height': 'auto', 'width': '100%', 'margin': '8px', 'gap': '16px' }}>

                    {/* Pokemon Title Section */}
                    <div id='section_cointainer' className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Title Name */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'alignItems': 'flex-start' }}>
                            <p className='font_head'>{props.name[0]?.toUpperCase() + props.name?.substring(1)}</p>
                        </div>

                        {/* Pokemon Type */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%' }}>
                            <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                <img src={pokeball} className='icon' alt="" /> Types {props.details?.types.map((list) => { return (list.type.name[0].toUpperCase() + list.type.name?.substring(1)) })}
                            </div>
                        </div>

                        {/* Pokemon Weakness */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%' }}>
                            <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                <img src={pokeball} className='icon' alt="" /> Weakness
                            </div>
                        </div>
                    </div>


                    {/* Pokemon Text Section */}
                    <div id='section_container' className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Text Description */}
                        <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '0px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                            <p className='font_body'>
                                {filterSpeciesFlavorTexEN?.slice(0, 1).map((text) => { return text.flavor_text })}
                                <br />
                                {/* It’s nature is to store up electricity.
                                Forests where nests of Pikachu live
                                are dangerous, since the trees are so often
                                struck by lightning */}
                            </p>
                        </div>
                    </div>

                    {/* Pokemon Stats Section */}
                    <div id='section_cointainer' className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Stats Title */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'alignItems': 'flex-start' }}>
                            <p className='font_head'>Stats</p>
                        </div>

                        {/* Pokemon Stats Table */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                            {/* Exp Row */}
                            < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}>

                                {/* Pokemon Stats Name */}
                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                    <img src={pokeball} className='icon' alt="" />
                                    <p className='font_body'>Exp</p>
                                </div>

                                {/* Pokemon Base Stats */}
                                <div className='root_column' style={{ 'height': 'auto', 'width': '30%' }}>
                                    <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>
                                        <p className='font_body'>{props.details?.base_experience}</p>
                                    </div>
                                </div>

                                {/* Pokemon Effort Stats */}
                                <div className='root_column' style={{ 'height': 'auto', 'width': '30%' }}>
                                    <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>
                                        <p className='font_body'>0</p>
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
                                            <div className='root_row' style={{ 'whiteSpace': 'nowrap', 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                                <img src={pokeball} className='icon' alt="" />
                                                <p className='font_body'>
                                                    {(list.stat?.name?.split("-").map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" "))}
                                                </p>
                                            </div>

                                            {/* Pokemon Base Stats */}
                                            <div className='root_column' style={{ 'height': 'auto', 'width': '30%' }}>
                                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>
                                                    <p className='font_body'>{list.base_stat}</p>
                                                </div>
                                            </div>

                                            {/* Pokemon Effort Stats */}
                                            <div className='root_column' style={{ 'height': 'auto', 'width': '30%' }}>
                                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'center', 'alignItems': 'center' }}>
                                                    <p className='font_body'>{list.effort}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}

                        </div>
                    </div>





                </div>



                {/* Right Column */}
                <div id='main_container' className='root_column' style={{ 'zIndex': '999', 'overflow': 'visible', 'height': 'auto', 'width': '100%', 'margin': '8px', 'gap': '16px' }}>


                    {/* Pokemon Abilities Info */}
                    <div id='section_cointainer' className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Abilities Title */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'alignItems': 'flex-start' }}>
                            <p className='font_head'>Abilities</p>
                        </div>

                        {/* Height Row */}
                        {/* < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}> */}
                        <div className='root_column' style={{ 'height': 'auto', 'gap': '4px', 'width': '100%' }}>


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
                                                        ...localState, 'abilities': {
                                                            ...localState.abilities,
                                                            'abilitySelectedName': e.currentTarget.getAttribute('data-name'),
                                                            'abilitySelectedDescription': `${e.currentTarget.getAttribute('data-name')}_description`,
                                                            'abilityURL': e.currentTarget.getAttribute('data-url')
                                                        }
                                                    })
                                                }
                                            }
                                            style={{ 'height': 'auto', 'gap': '4px', 'padding': '4px', 'width': '100%', 'cursor': 'pointer' }}>


                                            {/* Abilities Row */}
                                            < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}>

                                                {/* Pokemon Abilities Name */}
                                                <div className='root_row' style={{ 'whiteSpace': 'nowrap', 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                                    <img src={pokeball} className='icon' alt="" />
                                                    <p className='font_body'>
                                                        {(list.ability?.name?.split("-").map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" "))}
                                                    </p>
                                                </div>

                                                {/* Toggle */}
                                                <div className='root_row' style={{ 'whiteSpace': 'nowrap', 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
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


                            {/* Show More Moves Section */}
                            < div
                                onClick={() => {
                                    props.details?.abilities && props.details?.abilities.length > 5 && props.details?.abilities.length != localState.abilities.sliceEnd ?
                                        setLocalState({ ...localState, 'moves': { ...localState.moves, 'sliceEnd': props.details?.abilities?.length } }) :
                                        setLocalState({ ...localState, 'moves': { ...localState.moves, 'sliceEnd': 5 } })
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


                    {/* Pokemon Moves Info */}
                    <div id='section_cointainer' className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Moves Title */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'alignItems': 'flex-start' }}>
                            <p className='font_head'>Moves</p>
                        </div>

                        {/* Height Row */}
                        {/* < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}> */}
                        <div className='root_column' style={{ 'height': 'auto', 'gap': '0px', 'width': '100%' }}>


                            {/* Map the stats list */}
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
                                                        ...localState, 'moves': {
                                                            ...localState.moves,
                                                            'moveSelectedName': e.currentTarget.getAttribute('data-name'),
                                                            'moveSelectedDescription': `${e.currentTarget.getAttribute('data-name')}_description`,
                                                            'moveURL': e.currentTarget.getAttribute('data-url')
                                                        }
                                                    })
                                                }
                                            }
                                            style={{ 'height': 'auto', 'gap': '4px', 'padding': '4px', 'width': '100%' }}>

                                            {/* Stats Name Row */}
                                            < div
                                                className='root_row'
                                                style={{ 'cursor': 'pointer', 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}>

                                                {/* Pokemon Stats Name */}
                                                <div className='root_row' style={{ 'whiteSpace': 'nowrap', 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                                    <img src={pokeball} className='icon' alt="" />
                                                    <p className='font_body'>
                                                        {(list.move?.name?.split("-").map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" "))}
                                                    </p>
                                                </div>

                                                {/* Toggle */}
                                                <div className='root_row' style={{ 'whiteSpace': 'nowrap', 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                                    <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-end', 'alignItems': 'center' }}>
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
                                                    style={{ 'backgroundColor': 'rgba(0, 0, 0, 0.05)', 'padding': '4px', 'height': 'auto', 'width': '100%', 'justifyContent': 'space-evenly' }}>
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

export default PokemonDetailsPage