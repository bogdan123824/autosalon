import Button from "../../components/Button/Button";
import '../../css/order-count.css';

export default function TabsSection( { active, onChange, orderCount, driveCount, connectionCount }: { active: string, onChange: (current: string) => void, orderCount: number, driveCount: number, connectionCount: number } ) {
  return (
    <section style={{marginBottom: '3rem'}} >
        <Button isActive={active === 'cars'} onClick={() => onChange('cars')}>Cars</Button>
        <Button isActive={active === 'brand'} onClick={() => onChange('brand')}>Brand</Button>
        <Button isActive={active === 'team'} onClick={() => onChange('team')}>Team</Button>
        <Button style={{position: 'relative', display: 'inline-block'}} isActive={active === 'orders'} onClick={() => onChange('orders')}>
                Orders
                {orderCount > 0 && (
          <span className="count">{orderCount}</span>
        )}
        </Button>
        <Button style={{position: 'relative', display: 'inline-block'}} isActive={active === 'drives'} onClick={() => onChange('drives')}>
                Test-Drives
                {driveCount > 0 && (
          <span className="count">{driveCount}</span>
        )}
        </Button>
        <Button style={{position: 'relative', display: 'inline-block'}} isActive={active === 'connections'} onClick={() => onChange('connections')}>
                Connections
                {connectionCount > 0 && (
          <span className="count">{connectionCount}</span>
        )}
        </Button>
    </section>
  )
}