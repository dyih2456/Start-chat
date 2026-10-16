import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cleanPhoneNumber,
  validatePhoneNumber,
  buildWhatsAppUrl,
  buildWhatsAppBusinessUrl,
  buildWhatsAppBusinessIntent,
  buildUniversalWhatsAppUrl,
  buildSmsUrl,
  buildTelegramUrl,
  buildSignalUrl,
  buildViberUrl,
  buildTelUrl,
  COUNTRIES,
} from './phone.ts';

test('cleanPhoneNumber handles pure local number with selected dial code', () => {
  const result = cleanPhoneNumber('5551234567', '+1');
  assert.equal(result, '15551234567');
});

test('cleanPhoneNumber handles formatted US number with spaces, parentheses and dashes', () => {
  const result = cleanPhoneNumber('(555) 234-5678', '+1');
  assert.equal(result, '15552345678');
});

test('cleanPhoneNumber strips UK leading zero trunk code', () => {
  const result = cleanPhoneNumber('07911 123456', '+44');
  assert.equal(result, '447911123456');
});

test('cleanPhoneNumber respects international plus prefix when pasted', () => {
  const result = cleanPhoneNumber('+966 50 123 4567', '+1');
  assert.equal(result, '966501234567');
});

test('cleanPhoneNumber replaces leading 00 exit code with dial digits', () => {
  const result = cleanPhoneNumber('0044 7911 123456', '+1');
  assert.equal(result, '447911123456');
});

test('cleanPhoneNumber avoids duplicate dial code when already included', () => {
  const result = cleanPhoneNumber('447911123456', '+44');
  assert.equal(result, '447911123456');
});

test('validatePhoneNumber correctly validates length boundaries', () => {
  assert.equal(validatePhoneNumber('').isValid, false);
  assert.equal(validatePhoneNumber('12345').isValid, false); // < 7 digits
  assert.equal(validatePhoneNumber('15551234567').isValid, true);
  assert.equal(validatePhoneNumber('1234567890123456').isValid, false); // > 15 digits
  assert.equal(validatePhoneNumber('1555abc1234').isValid, false);
});

test('buildWhatsAppUrl properly encodes text message query', () => {
  const url = buildWhatsAppUrl('15551234567', 'Hello there! & welcome');
  assert.equal(url, 'https://wa.me/15551234567?text=Hello%20there!%20%26%20welcome');
});

test('buildWhatsAppUrl works without message', () => {
  const url = buildWhatsAppUrl('15551234567');
  assert.equal(url, 'https://wa.me/15551234567');
});

test('buildSmsUrl properly creates sms scheme with body', () => {
  const url = buildSmsUrl('15551234567', 'Hi there');
  assert.equal(url, 'sms:+15551234567?body=Hi%20there');
});

test('buildTelegramUrl properly creates telegram direct link', () => {
  const url = buildTelegramUrl('447911123456', 'Hello Telegram');
  assert.equal(url, 'https://t.me/+447911123456?text=Hello%20Telegram');
});

test('buildSignalUrl properly creates signal phone link', () => {
  const url = buildSignalUrl('15551234567');
  assert.equal(url, 'https://signal.me/#p/+15551234567');
});

test('buildViberUrl creates valid viber URI', () => {
  const url = buildViberUrl('15551234567');
  assert.equal(url, 'viber://chat?number=%2B15551234567');
});

test('buildTelUrl creates valid tel URI', () => {
  const url = buildTelUrl('15551234567');
  assert.equal(url, 'tel:+15551234567');
});

test('COUNTRIES dataset contains top regions and proper dial codes', () => {
  assert.ok(COUNTRIES.length > 20);
  const us = COUNTRIES.find(c => c.code === 'US');
  assert.equal(us?.dialCode, '+1');
  const sa = COUNTRIES.find(c => c.code === 'SA');
  assert.equal(sa?.dialCode, '+966');
  const iq = COUNTRIES.find(c => c.code === 'IQ');
  assert.equal(iq?.dialCode, '+964');
  assert.equal(iq?.nameAr, 'العراق');
});

test('cleanPhoneNumber defaults to Iraq dial code if unspecified', () => {
  const result = cleanPhoneNumber('07701234567');
  assert.equal(result, '9647701234567');
});

test('buildWhatsAppBusinessIntent explicitly targets com.whatsapp.w4b package', () => {
  const intent = buildWhatsAppBusinessIntent('9647701234567', 'مرحبا');
  assert.ok(intent.includes('package=com.whatsapp.w4b'));
  assert.ok(intent.includes('phone=9647701234567'));
  assert.ok(intent.includes('scheme=whatsapp'));
  
  const universal = buildUniversalWhatsAppUrl('9647701234567', 'مرحبا');
  assert.equal(universal, 'https://wa.me/9647701234567?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7');
});

