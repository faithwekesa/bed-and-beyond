import { SITE } from '@/lib/site'
import { whatsapp } from '@/lib/links'
import { PACKAGE_ITEMS, PACKAGE_TOTAL } from '@/lib/package'

const kes = (n: number) => n.toLocaleString('en-US')

export default function BudgetTable() {
  const pay = (SITE as unknown as { paybill?: { number: string; account: string } }).paybill
  const tel = SITE.phones[0].tel

  return (
    <section className="section" id="package">
      <div className="wrap bt">
        <span className="bt-eyebrow">The Bed Dignity Package</span>
        <h2>What one bed for one older person costs</h2>
        <p className="bt-intro">
          You can give a complete package for one older person or choose single items from the list below.
        </p>

        <div className="bt-scroll">
          <table className="bt-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th className="bt-unit">Unit cost (KES)</th>
                <th>Total (KES)</th>
              </tr>
            </thead>
            <tbody>
              {PACKAGE_ITEMS.map((x) => (
                <tr key={x.name}>
                  <td>
                    {x.name}
                    {x.detail ? <span className="bt-detail">{x.detail}</span> : null}
                  </td>
                  <td>{x.qty}</td>
                  <td className="bt-unit">{kes(x.unit)}</td>
                  <td>{kes(x.total)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>Total Bed Dignity Package</td>
                <td className="bt-unit" />
                <td>KES {kes(PACKAGE_TOTAL)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="bt-actions">
          <a
            className="btn btn-primary"
            href={whatsapp(tel, `Hello, I would like to give a complete Bed Dignity Package (KES ${kes(PACKAGE_TOTAL)}).`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Give a complete package
          </a>
          <a
            className="btn btn-outline"
            href={whatsapp(tel, 'Hello, I would like to give towards a single item: ')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Give a single item
          </a>
        </div>

        <p className="bt-pay">
          {pay && pay.number
            ? `Paybill ${pay.number}, account ${pay.account}`
            : 'Our Paybill details are being finalised. Message us and we will share them with you.'}
        </p>
      </div>
    </section>
  )
}
