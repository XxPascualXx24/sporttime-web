import { useState } from 'react'
import styles from './Tienda.module.css'

const categories = ['Todo', 'Accesorios', 'Equipaciones']

const products = [
  { id: 1, name: 'Camiseta partido Sport', price: 39.99, category: 'Equipaciones' },
  { id: 2, name: 'Camiseta partido Sport', price: 39.99, category: 'Equipaciones' },
  { id: 3, name: 'Camiseta partido Sport', price: 39.99, category: 'Equipaciones' },
  { id: 4, name: 'Camiseta partido Sport', price: 39.99, category: 'Equipaciones' },
  { id: 5, name: 'Camiseta partido Sport', price: 39.99, category: 'Equipaciones' },
  { id: 6, name: 'Camiseta partido Sport', price: 39.99, category: 'Equipaciones' },
  { id: 7, name: 'Botella Club', price: 14.99, category: 'Accesorios' },
  { id: 8, name: 'Mochila Sporttime', price: 29.99, category: 'Accesorios' },
  { id: 9, name: 'Bufanda oficial', price: 12.99, category: 'Accesorios' },
]

export default function Tienda() {
  const [active, setActive] = useState('Todo')
  const [search, setSearch] = useState('')

  const filtered = products.filter(p => {
    const matchCat = active === 'Todo' || p.category === active
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <main className={styles.page}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className="container">
        <h1 className={styles.title}>Tienda</h1>

        <div className={styles.filters}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.filter} ${active === cat ? styles.filterActive : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className={styles.empty}>No se encontraron productos.</p>
        ) : (
          <div className={styles.grid}>
            {filtered.map(p => (
              <article key={p.id} className={styles.card}>
                <div className={styles.img}>
                  <span className={styles.imgLabel}>Foto producto</span>
                </div>
                <h3 className={styles.name}>{p.name}</h3>
                <p className={styles.price}>{p.price.toFixed(2)}€</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
