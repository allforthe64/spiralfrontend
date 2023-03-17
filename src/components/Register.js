import { useRef, useState, useEffect } from "react"
import axios from "../api/axios"
import { Link } from "react-router-dom"

import FieldValid from "./FieldValid"
import InfoNote from "./InfoNote"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTER_URL = '/register'

const Register = () => {

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user)
        console.log(result)
        console.log(user)
        setValidName(result)
    }, [user])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        console.log(result)
        console.log(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        console.log(result)
        console.log(pwd)
        setValidPwd(PWD_REGEX.test(pwd))
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Prevent button being enabled with JS hack
        const v1 = USER_REGEX.test(user)
        const v3 = EMAIL_REGEX.test(email)
        const v2 = PWD_REGEX.test(pwd)
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry")
            return
        }

        try {
            // Axios response is in JSON
            const response = await axios.post(REGISTER_URL, 
                JSON.stringify({ user, email, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }

            )
            
            console.log(response?.data)
            console.log(response?.accessToken)
            console.log(JSON.stringify(response))
            setSuccess(true)

            //Clear input fields
            setUser('')
            setEmail('')
            setPwd('')
            setMatchPwd('')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken')
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus()
        }
    }


    return (
        <>
        {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    <Link to='/login'>Sign In</Link>
                </p>
            </section>
        ) : (
            <section className="regForm py-20">
                <p ref={errRef} className={errMsg ? "errmsg w-6/12 ml-[25%]" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1 className="text-white headings font-bold text-5xl mb-16">Sign Up</h1>
                
                <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                    <div className="w-5/12 flex justify-around mb-6">
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            className='w-[85%] bg-inherit border-b-2 outline-0 text-white info-txt text-2xl pl-2 pb-px mb-6'
                            placeholder="username"
                        />
                        <FieldValid exp1={validName ? "valid" : "hide"} exp2={validName || !user ? "hide" : "invalid"}/>
                    </div>
                    <div className="w-5/12 flex justify-around mb-6">
                        <input
                            type="text"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            className='w-[85%] bg-inherit border-b-2 outline-0 text-white info-txt text-2xl pl-2 pb-px mb-6'
                            placeholder="email"
                        />
                        <FieldValid exp1={validEmail ? "valid" : "hide"} exp2={validEmail || !email ? "hide" : "invalid"}/>
                    </div>
                    <div className="w-5/12 flex justify-around mb-6">
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            className='w-[85%] bg-inherit border-b-2 outline-0 text-white info-txt text-2xl pl-2 pb-px mb-6'
                            placeholder="password"
                        />
                        <FieldValid exp1={validPwd ? "valid" : "hide"} exp2={validPwd || !pwd ? "hide" : "invalid"}/>
                    </div>
                    <div className="w-5/12 flex justify-around">
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            className='w-[85%] bg-inherit border-b-2 outline-0 text-white info-txt text-2xl pl-2 pb-px mb-6'
                            placeholder="confirm password"
                        />
                        <FieldValid exp1={validMatch && matchPwd ? "valid" : "hide"} exp2={validMatch || !matchPwd ? "hide" : "invalid"}/>
                    </div>
                    <div className="h-20 mb-10">
                        {/* Will be read by screen reader for Username input */}
                        <InfoNote _id={'uidnote'} exp1={userFocus && user && !validName ? "instructions" : "offscreen"} line1={'4 to 24 characters.'} line2={'Must begin with a letter.'} line3={'Letters, numbers, underscores, hyphens allowed.'}/>
                        {/* Will be read by screen reader for Email input */}
                        <InfoNote _id={'emailnote'} exp1={emailFocus && !validEmail ? "instructions" : "offscreen"} line1={'must enter a valid password.'} line2={'_____@domain.com'} line4={true}/>
                        {/* Will be read by screen reader for Password input */}
                        <InfoNote _id={'pwdnote'} exp1={pwdFocus && !validPwd ? "instructions" : "offscreen"} line1={'8 to 24 characters.'} line2={'Must include uppercase and lowercase letters, a number and a special character.'} line3={'Allowed special characters:'} line4={true}/>
                        {/* Will be read by screen reader for Confirm Password input */}
                        <InfoNote _id={'confirmnote'} exp1={matchFocus && !validMatch ? "instructions" : "offscreen"} line1={'Must match the first password input field.'} />
                    </div>

                    <button className="info-txt text-black font-bold text-2xl mb-8 bg-alien-green py-px px-8 rounded-md" disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>

                </form>

                <p>
                    Already registered?<br />
                    <span className="line">
                        {/*put router link here*/}
                        <Link to={'/login'} className={'hover:underline'}>Sign In</Link>
                    </span>
                </p>

            </section>
        )}
    </>)
}

export default Register