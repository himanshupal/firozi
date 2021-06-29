const Aside = (): JSX.Element => {
	return (
		<aside className="panel panel--side flex align-items-center justify-content-center bg-yellow">
			<div className="flex flex-grow flex-column justify-content-between h-full">
				<div className="title text-center">
					:: Select categories to view Ad from ::
				</div>

				<form className="sections">
					<ul className="section">
						<li className="list-title">
							<input type="checkbox" id="electronics" name="filter" />
							<label htmlFor="electronics">Electronics</label>
						</li>
						<ul className="list-items">
							<li className="list-item">List Item</li>
							<li className="list-item">List Item</li>
							<li className="list-item">List Item</li>
							<li className="list-item">List Item</li>
							<li className="list-item">List Item</li>
						</ul>
					</ul>
					<ul className="section">
						<li className="list-title">
							<input type="checkbox" id="jobs" name="filter" />
							<label htmlFor="jobs">Jobs</label>
						</li>
						<ul className="list-items">
							<li className="list-title">By Profession</li>
							<ul className="list-items">
								<li className="list-item">List Item</li>
								<li className="list-item">List Item</li>
								<li className="list-item">List Item</li>
								<li className="list-item">List Item</li>
							</ul>
							<li className="list-title">By Category</li>
							<ul className="list-items">
								<li className="list-item">List Item</li>
								<li className="list-item">List Item</li>
								<li className="list-item">List Item</li>
								<li className="list-item">List Item</li>
							</ul>
						</ul>
					</ul>
					<ul className="section">
						<li className="list-title">
							<input type="checkbox" id="vehicles" name="filter" />
							<label htmlFor="vehicles">Vehicles</label>
						</li>
						<ul className="list-items">
							<li className="list-title">No. of Wheels</li>
							<ul className="list-items">
								<li className="list-item">2-Wheeler</li>
								<li className="list-item">3-Wheeler</li>
								<li className="list-item">4-Wheeler</li>
								<li className="list-item">Large Vehicles</li>
							</ul>
							<li className="list-title">By Brand</li>
							<ul className="list-items">
								<li className="list-item">List Item</li>
								<li className="list-item">List Item</li>
								<li className="list-item">List Item</li>
								<li className="list-item">List Item</li>
							</ul>
							<li className="list-title">By Category</li>
							<ul className="list-items">
								<li className="list-item">List Item</li>
								<li className="list-item">List Item</li>
								<li className="list-item">List Item</li>
								<li className="list-item">List Item</li>
							</ul>
						</ul>
					</ul>
				</form>

				<button className="button button--filter">Apply Filter</button>
			</div>
		</aside>
	)
}

export default Aside
