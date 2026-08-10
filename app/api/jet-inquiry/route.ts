import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { tripType, from, to, date, returnDate, passengers, animals, aircraftType, flexibility, notes, contact } = body

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #06090f; color: #f5eedd; padding: 40px;">
      <div style="border-bottom: 1px solid #b8974a; padding-bottom: 24px; margin-bottom: 32px;">
        <div style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #b8974a; margin-bottom: 8px;">Syrama · Private Aviation</div>
        <h1 style="font-size: 28px; font-weight: 300; color: #f5eedd; margin: 0;">New Jet Charter Request</h1>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #6a6a5e; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; width: 40%;">Trip type</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #f5eedd; font-size: 15px;">${tripType === 'roundtrip' ? 'Round Trip' : tripType === 'oneway' ? 'One Way' : 'Multi-Leg'}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #6a6a5e; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">From</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #f5eedd; font-size: 15px;">${from}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #6a6a5e; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">To</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #f5eedd; font-size: 15px;">${to}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #6a6a5e; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">Departure</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #f5eedd; font-size: 15px;">${date}</td></tr>
        ${returnDate ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #6a6a5e; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">Return</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #f5eedd; font-size: 15px;">${returnDate}</td></tr>` : ''}
        <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #6a6a5e; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">Passengers</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #f5eedd; font-size: 15px;">${passengers}</td></tr>
        ${animals ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #6a6a5e; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">Animals</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #f5eedd; font-size: 15px;">${animals}</td></tr>` : ''}
        <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #6a6a5e; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">Aircraft</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #f5eedd; font-size: 15px;">${aircraftType}</td></tr>
        <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #6a6a5e; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">Flexibility</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #f5eedd; font-size: 15px;">${flexibility}</td></tr>
        ${notes ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #6a6a5e; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">Notes</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #f5eedd; font-size: 15px;">${notes}</td></tr>` : ''}
      </table>
      <div style="margin-top: 32px; padding: 24px; border: 1px solid rgba(184,151,74,0.3); background: rgba(184,151,74,0.05);">
        <div style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #b8974a; margin-bottom: 16px;">Client Contact</div>
        <div style="color: #f5eedd; font-size: 15px; margin-bottom: 6px;">${contact.name}</div>
        ${contact.email ? `<div style="color: #6a6a5e; font-size: 13px; margin-bottom: 4px;">${contact.email}</div>` : ''}
        ${contact.phone ? `<div style="color: #6a6a5e; font-size: 13px;">${contact.phone}</div>` : ''}
      </div>
      <div style="margin-top: 32px; font-size: 11px; color: rgba(106,106,94,0.5); text-align: center; letter-spacing: 0.1em;">SYRAMA · DUBAI · PRIVATE AVIATION</div>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"Syrama Jet Finder" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      replyTo: contact.email || undefined,
      subject: `✈ Jet Request — ${from} → ${to} · ${date} · ${passengers}`,
      html,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Email error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to send' }, { status: 500 })
  }
}
