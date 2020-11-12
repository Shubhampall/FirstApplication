import React from 'react';
import './style.css';
function Profile() {
	const profile = localStorage.getItem('Profile');
	const name = localStorage.getItem('Name');
	const email = localStorage.getItem('UserEmail');
	return (
		<div className="">
			<div className="card">
				<div className="upper-container">
					<div className="image-container img">
						<img src={profile} alt="" height="100px" weight="100px" />
					</div>
				</div>
				<div className="lower-container">
					<h3>{name}</h3>
					<h4>{email}</h4>
					<p2>Hi,I am {name}</p2>
				</div>
			</div>
		</div>
	);
}

export default Profile;
