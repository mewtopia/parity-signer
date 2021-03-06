// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import { Alert, AlertButton, Clipboard } from 'react-native';

export const alertErrorWithMessage = (
	message: string,
	buttonText: string
): void =>
	Alert.alert('Error', message, [
		{
			style: 'cancel',
			text: buttonText
		}
	]);

export const alertIdentityCreationError = (): void =>
	alertErrorWithMessage("Can't create Identity from the seed", 'Try again');

export const alertPathDerivationError = (): void =>
	alertErrorWithMessage("Can't derive account from the seed", 'Try again');

export const alertPathDeletionError = (): void =>
	alertErrorWithMessage("Can't delete this account.", 'Try again');

export const alertIdentityDeletionError = (): void =>
	alertErrorWithMessage("Can't delete Identity.", 'Try again');

const buildAlertButtons = (
	onConfirm: () => any,
	confirmText: string
): AlertButton[] => [
	{
		onPress: (): void => {
			onConfirm();
		},
		style: 'destructive',
		text: confirmText
	},
	{
		style: 'cancel',
		text: 'Cancel'
	}
];

const buildAlertDeleteButtons = (onDelete: () => any): AlertButton[] =>
	buildAlertButtons(onDelete, 'Delete');

export const alertDeleteAccount = (
	accountName: string,
	onDelete: () => any
): void => {
	Alert.alert(
		'Delete Account',
		`Do you really want to delete ${accountName}?`,
		buildAlertDeleteButtons(onDelete)
	);
};

export const alertDeleteLegacyAccount = (
	accountName: string,
	onDelete: () => any
): void => {
	Alert.alert(
		'Delete Account',
		`Do you really want to delete ${accountName}?
The account can only be recovered with its associated recovery phrase.`,
		buildAlertDeleteButtons(onDelete)
	);
};

export const alertDeleteIdentity = (onDelete: () => any): void => {
	Alert.alert(
		'Delete Identity',
		`Do you really want to delete this Identity and all the related accounts?
This identity can only be recovered with its associated recovery phrase.`,
		buildAlertDeleteButtons(onDelete)
	);
};

export const alertCopyBackupPhrase = (seedPhrase: string): void =>
	Alert.alert(
		'Write this recovery phrase on paper',
		'It is not recommended to transfer or store a recovery phrase digitally and unencrypted. Anyone in possession of this recovery phrase is able to spend funds from this account.',
		[
			{
				onPress: (): void => {
					Clipboard.setString(seedPhrase);
				},
				style: 'default',
				text: 'Copy anyway'
			},
			{
				style: 'cancel',
				text: 'Cancel'
			}
		]
	);

export const alertRisks = (message: string, onPress: () => any): void =>
	Alert.alert('Warning', message, [
		{
			onPress,
			style: 'default',
			text: 'I understand the risks'
		},
		{
			style: 'cancel',
			text: 'Back'
		}
	]);

export const alertMultipart = (onNext: () => any): void =>
	alertRisks(
		'The payload of the transaction you are signing is too big to be decoded. Not seeing what you are signing is inherently unsafe. If possible, contact the developer of the application generating the transaction to ask for multipart support.',
		onNext
	);

export const alertDecodeError = (): void =>
	Alert.alert(
		'Could not decode method with available metadata.',
		'Signing something you do not understand is inherently unsafe. Do not sign this extrinsic unless you know what you are doing, or update Parity Signer to be able to decode this message. If you are not sure, or you are using the latest version, please open an issue on github.com/paritytech/parity-signer.',
		[
			{
				style: 'default',
				text: 'Okay'
			}
		]
	);

export const alertBackupDone = (onPress: () => any): void =>
	Alert.alert(
		'Important',
		"Make sure you've backed up this recovery phrase. It is the only way to restore your account in case of device failure/lost.",
		[
			{
				onPress,
				text: 'Proceed'
			},
			{
				style: 'cancel',
				text: 'Cancel'
			}
		]
	);
