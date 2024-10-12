import { useState, useCallback, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [character, setCharacter] = useState(false);
	const [number, setNumber] = useState(false);
	const [symbol, setSymbol] = useState(false);
	const [length, setLength] = useState(8);
	const [password, setPassword] = useState("");

	const passwordRef = useRef(null)

	const passwordGenerator = useCallback(
		function () {

			let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
			let num = "0123456789";
			let sym = "!@#$%^&*()_+";
			let values = "";
			if (true) {
				values += char;
			}
			if (character) {
				values += sym;
			}
			if (number) {
				values += num;
			}

			let password = "";
			for (let i = 0; i < length; i++) {
				password += values.charAt(
					Math.floor(Math.random() * values.length + 1)
				);
			}
			setPassword(password);
		},
		[character, length, number, symbol, setPassword]

	);

	const copyPasswordToClipboard = useCallback(() => {
		passwordRef.current?.select();
		passwordRef.current?.setSelectionRange(0, 50);
		window.navigator.clipboard.writeText(password)
	  }, [password])

	return (
		<>
			<div className="h-screen">
				<div className="text-4xl  font-bold text-white ">
					Password Generator
				</div>
				<div className="flex justify-center items-center h-4/5 gap-4 flex-col">
					<div className="flex justify justify-center my-8 rounded-md overflow-hidden text-white  bg-slate-600 ">
						<input
							className=" selection:bg-red-300 py-4 px-4 min-w-96 text-2xl font-bold text-slate-950 outline-none"
							type="text"
							value={password}
							ref={passwordRef}
							readOnly
							placeholder="Password"
						/>
						<button   onClick={copyPasswordToClipboard} className=" hover:scale-105 hover:bg-red-600 py-6 px-4 min-w-44 text-2xl font-bold bg-red-500  ">
							copy
						</button>
					</div>
					<button onClick={passwordGenerator} className="py-4 hover:scale-105 hover:bg-blue-600 px-4 min-w-80 rounded-md text-2xl font-bold bg-blue-500  ">
						Generate
					</button>

					<div className="flex  text-2xl text-white gap-x-2">
					<div className="flex items-center gap-x-1">
						<input
							type="range"
							min={8}
							max={32}
							value={length}
							className="cursor-pointer"
							onChange={(e) => {
								setLength(e.target.value);
							}}
						/>
						<label>Length: {length}</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							defaultChecked={number}
							id="numberInput"
							onChange={() => {
								setNumber((prev) => !prev);
							}}
						/>
						<label htmlFor="numberInput">Numbers</label>
					</div>
					
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							defaultChecked={character}
							id="characterInput"
							onChange={() => {
								setCharacter((prev) => !prev);
							}}
						/>
						<label htmlFor="characterInput">Characters</label>
					</div>
				</div>
				</div>

			</div>
		</>
	);
}

export default App;
