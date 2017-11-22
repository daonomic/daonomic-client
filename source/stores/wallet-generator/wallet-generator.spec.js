import { when } from 'mobx';
import walletGenerator from './wallet-generator';

describe('walletGenerator', () => {
  test('should not generate wallet initially', () => {
    expect(walletGenerator.isGenerated).toBe(false);
    expect(walletGenerator.generatedWallet).toBe(null);
    expect(walletGenerator.encryptedWallet).toBe('');
  });

  test('should generate new wallet', (done) => {
    const testPassword = '123456';

    expect(walletGenerator.isGenerated).toBe(false);
    walletGenerator.generate({ password: testPassword });
    expect(walletGenerator.isGenerating).toBe(true);

    when(
      () => walletGenerator.isGenerated,
      () => {
        expect(typeof walletGenerator.generatedWallet.address).toBe('string');
        expect(walletGenerator.generatedWallet.address.length).toBeGreaterThan(0);

        expect(typeof walletGenerator.generatedWallet.privateKey).toBe('string');
        expect(walletGenerator.generatedWallet.privateKey.length).toBeGreaterThan(0);

        expect(walletGenerator.generatedWallet.password).toBe(testPassword);

        expect(typeof walletGenerator.encryptedWallet).toBe('string');
        expect(walletGenerator.encryptedWallet.length).toBeGreaterThan(0);

        done();
      },
    );
  });
});
