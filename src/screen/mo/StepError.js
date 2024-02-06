import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector, batch } from 'react-redux'
import axios from 'axios'

import {
  setIsOpen,
  setContent,
  setButtonText,
  setButtonFunc,
  close,
} from '../../actions/modal'

import MainSection from '../../components/mo/MainSection'
import StepHeader from '../../components/mo/StepHeader'
import Title from '../../components/mo/Title'
import Spacer from '../../components/mo/Spacer'
import StepButton from '../../components/mo/StepButton'
import InputArea from '../../components/mo/InputArea'
import Loading from '../../components/mo/Loading'

import getUrlParams from '../../apis/GetUrlParams'
import sendLog from '../../apis/sendLog'

const StepError = () => {


  return (
    <MainSection>

    </MainSection>
  )
}

export default StepError

