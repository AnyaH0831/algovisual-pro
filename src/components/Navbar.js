import React, { useState } from 'react'

export default function Navbar({ activePage, onNavigate }) {
  const [showAlgorithms, setShowAlgorithms] = useState(false);

  const handleNavigate = (event, page) => {
    event.preventDefault();
    onNavigate(page);
    setShowAlgorithms(false);
  };

  return (
    <nav className="navbar">
      <h1>AlgoVisual Pro</h1>
      <div className="links">
        <a
          href="/"
          onClick={(event) => handleNavigate(event, 'home')}
          className={activePage === 'home' ? 'active' : ''}
        >
          Home
        </a>

        <div className="dropdown">
          <button
            type="button"
            className={`dropdown-toggle ${activePage === 'binary' || activePage === 'dfs' ? 'active' : ''}`}
            onClick={() => setShowAlgorithms((prev) => !prev)}
          >
            Algorithms
          </button>

          {showAlgorithms && (
            <div className="dropdown-menu">
              <a
                href="/algorithms/binary-search"
                onClick={(event) => handleNavigate(event, 'binary')}
              >
                Binary Search
              </a>
              <a
                href="/algorithms/dfs"
                onClick={(event) => handleNavigate(event, 'dfs')}
              >
                DFS
              </a>
            </div>
          )}
        </div>

        {/* <a
          href="/profile"
          onClick={(event) => handleNavigate(event, 'profile')}
          className={activePage === 'profile' ? 'active' : ''}
        >
          Profile
        </a> */}

      </div>
    </nav>
  )
}
               