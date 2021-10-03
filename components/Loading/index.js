import { Circle } from 'better-react-spinkit'
export function Loading () {
  return (
        <center style={{ display: 'grid', placeItems: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <img
                src="https://1000marcas.net/wp-content/uploads/2019/11/WhatsApp-logo.png"
                alt="spinner"
                height="200"
                loading="lazy"
                />
            </div>
            <Circle color="#3CBC28" size={60} />
        </center>
  )
}
