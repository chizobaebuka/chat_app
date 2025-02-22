const GenderCheckbox = ({
	selectedGender,
	onCheckBoxChange,
}: {
	selectedGender: string;
    onCheckBoxChange: ( gender: "male" | "female" ) => void;
}) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Male</span>
					<input type='checkbox' className='checkbox border-slate-900' 
						checked={selectedGender.toLocaleLowerCase() === "male"}
						onChange={() => onCheckBoxChange("male")}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer`}>
					<span className='label-text'>Female</span>
					<input type='checkbox' className='checkbox border-slate-900' 
						checked={selectedGender.toLocaleLowerCase() === "female"} 
						onChange={() => onCheckBoxChange("female")}
					/>
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;
