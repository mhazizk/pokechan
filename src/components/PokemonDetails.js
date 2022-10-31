import './Styles.css'
import pokeball from '../assets/pokeball.png'
import axios from 'axios'
import { useEffect, useState } from 'react'

const PokemonDetailsPage = (props) => {

    const [localState, setLocalState] = useState({
        artworkURL: '',
        moves:
            { sliceEnd: 5 },
        abilities:
            { sliceEnd: 5 }
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

    // useEffect after updating Moves Slice End
    useEffect(() => {
        // refresh the state
    }, [localState.moves.sliceEnd])


    const getImage = props.details?.sprites?.other['official-artwork']?.front_default;
    console.log(getImage)

    // console.log(props.name)
    return (
        <>
            <div className='root_row' style={{ 'display': `${props.name ? 'flex' : 'none'}`, 'height': 'auto', 'width': '80vw', 'justifyContent': 'space-between', 'alignItems': 'flex-start' }}>


                {/* Left Column */}
                <div id='main_container' className='root_column' style={{ 'zIndex': '1003', 'overflow': 'visible', 'height': 'auto', 'width': '100%', 'margin': '8px', 'gap': '16px' }}>

                    {/* Pokemon Image Section */}
                    <div id='section_cointainer' className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Artwork Name */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'alignItems': 'center', 'overflow': 'visible', 'zIndex': '1002' }}>
                            <img src={getImage} className='artwork' />
                        </div>
                    </div>

                    {/* Pokemon Physical Info */}
                    <div id='section_cointainer' className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Stats Title */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%', 'alignItems': 'flex-start' }}>
                            <p className='font_head'>Physical Info</p>
                        </div>

                        {/* Height Row */}
                        < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}>

                            {/* Pokemon Stats Name */}
                            <div className='root_row' style={{ 'height': 'auto', 'width': '50%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                <img src={pokeball} className='icon' />
                                <p className='font_body'>Height</p>
                            </div>

                            {/* Pokemon Base Stats */}
                            <div className='root_column' style={{ 'height': 'auto', 'width': '50%' }}>
                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                    <p className='font_body'>{props.details?.height}'</p>
                                </div>
                            </div>
                        </div>

                        {/* Weight Row */}
                        < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}>

                            {/* Pokemon Weight Name */}
                            <div className='root_row' style={{ 'height': 'auto', 'width': '50%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                <img src={pokeball} className='icon' />
                                <p className='font_body'>Weight</p>
                            </div>

                            {/* Pokemon Weight Stats */}
                            <div className='root_column' style={{ 'height': 'auto', 'width': '50%' }}>
                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                    <p className='font_body'>{props.details?.weight} lbs</p>
                                </div>
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
                        <div className='root_column' style={{ 'height': 'auto', 'gap': '4px', 'width': '100%' }}>


                            {/* Map the stats list */}
                            {props.details?.moves?.slice(0, localState?.moves?.sliceEnd).map((list) => {
                                return (
                                    <>
                                        {/* HP Row */}
                                        < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}>

                                            {/* Pokemon Stats Name */}
                                            <div className='root_row' style={{ 'whiteSpace': 'nowrap', 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                                <img src={pokeball} className='icon' />
                                                <p className='font_body'>
                                                    {(list.move?.name?.split("-").map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" "))}
                                                </p>
                                            </div>

                                            {/* Toggle */}
                                            <div className='root_row' style={{ 'whiteSpace': 'nowrap', 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-end', 'alignItems': 'center' }}>
                                                    <p className='font_body_link' style={{ 'whiteSpace': 'nowrap' }}>Show ▼</p>
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
                                style={{ 'display': `${props.details?.moves?.length >= localState.moves?.sliceEnd ? 'flex' : 'none'}`, 'height': 'auto', 'width': '100%', 'justifyContent': 'center' }}>
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
                                <img src={pokeball} className='icon' /> Types {props.details?.types.map((list) => { return (list.type.name[0].toUpperCase() + list.type.name?.substring(1)) })}
                            </div>
                        </div>

                        {/* Pokemon Weakness */}
                        <div className='root_column' style={{ 'height': 'auto', 'width': '100%' }}>
                            <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                <img src={pokeball} className='icon' /> Weakness
                            </div>
                        </div>
                    </div>


                    {/* Pokemon Text Section */}
                    <div id='section_container' className='root_column' style={{ 'height': 'auto', 'width': '100%', 'gap': '4px' }}>

                        {/* Pokemon Text Description */}
                        <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '0px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                            <p className='font_body'>
                                It’s nature is to store up electricity.
                                Forests where nests of Pikachu live
                                are dangerous, since the trees are so often
                                struck by lightning
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
                                    <img src={pokeball} className='icon' />
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
                                                <img src={pokeball} className='icon' />
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
                                        {/* HP Row */}
                                        < div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'justifyContent': 'space-between' }}>

                                            {/* Pokemon Stats Name */}
                                            <div className='root_row' style={{ 'whiteSpace': 'nowrap', 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                                <img src={pokeball} className='icon' />
                                                <p className='font_body'>
                                                    {(list.ability?.name?.split("-").map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" "))}
                                                </p>
                                            </div>

                                            {/* Toggle */}
                                            <div className='root_row' style={{ 'whiteSpace': 'nowrap', 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-start', 'alignItems': 'center' }}>
                                                <div className='root_row' style={{ 'height': 'auto', 'width': '100%', 'gap': '8px', 'justifyContent': 'flex-end', 'alignItems': 'center' }}>
                                                    <p className='font_body_link' style={{ 'whiteSpace': 'nowrap' }}>Show ▼</p>
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
                                // onClick={props.details?.moves && localState.moves.sliceEnd == 5 ?
                                //     setLocalState({ ...localState, 'moves': { ...localState.moves, 'sliceEnd': props.details?.moves?.length } }) :
                                //     setLocalState({ ...localState, 'moves': { ...localState.moves, 'sliceEnd': 5 } })
                                // }
                                className='root_row'
                                style={{ 'display': `${props.details?.abilities?.length > localState.abilities?.sliceEnd ? 'flex' : 'none'}`, 'height': 'auto', 'width': '100%', 'justifyContent': 'center' }}>
                                <p
                                    className='font_body_link'
                                    style={{ 'whiteSpace': 'nowrap' }}>
                                    Show all {props.details?.moves?.length} moves ▼
                                </p>
                            </div>

                        </div>
                    </div>



                </div>
                <div className='root_column' style={{ 'height': 'auto', 'width': '100%' }}>
                    Column 3

                </div>
            </div>
        </>
    )
}

export default PokemonDetailsPage