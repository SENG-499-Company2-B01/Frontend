import './Loading.css'
import styled from '@emotion/styled'

const LoadingBackground = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: #fcfcfc;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const PreLoader = () => {
    return (
        <LoadingBackground>
            <div className='load'>
                <div className='ball'></div>
                <div className='text'>LOADING</div>
            </div>
        </LoadingBackground>
    )
}

export default PreLoader
