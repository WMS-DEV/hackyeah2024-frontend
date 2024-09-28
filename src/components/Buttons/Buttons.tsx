import  Map  from './icons/Map.png'
import Add from './icons/Sum.png'
import Calendar from './icons/Tear-Off Calendar.png'
import Account from './icons/Account.png'


const Buttons =() =>{
    return(
        <div className='buttonIconsContainer'>

            <button className='buttonIcons'>
            <img src="src/components/Buttons/icons/Map.png" alt="" />
            </button>

            <button className='buttonIcons'>
            <img src="src/components/Buttons/icons/Sum.png" alt="" />
            </button>

            <button className='buttonIcons'>
            <img src="src/components/Buttons/icons/Tear-Off Calendar.png" alt="" />
            </button>

            <button className='buttonIcons'>
                <img src="src/components/Buttons/icons/Account.png" alt="" />
            </button>

        </div>

    )
}


export default Buttons