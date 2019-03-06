import { when } from 'mobx';
import { WalletGenerator } from '.';

describe('walletGenerator', () => {
  let walletGenerator = new WalletGenerator();

  beforeEach(() => {
    walletGenerator = new WalletGenerator();
  });

  test('should not generate wallet initially', () => {
    expect(walletGenerator.isGenerated).toBe(false);
    expect(walletGenerator.generatedWallet).toBe(null);
    expect(walletGenerator.encryptedWallet).toBe('');
  });

  test('should generate new wallet', async (done) => {
    const testPassword = '123456';

    expect(walletGenerator.isGenerated).toBe(false);
    walletGenerator.generate({ password: testPassword });
    expect(walletGenerator.isGenerating).toBe(true);
    await when(() => walletGenerator.isGenerated);
    expect(typeof walletGenerator.generatedWallet.address).toBe('string');
    expect(walletGenerator.generatedWallet.address.length).toBeGreaterThan(0);
    expect(typeof walletGenerator.generatedWallet.privateKey).toBe('string');
    expect(walletGenerator.generatedWallet.privateKey.length).toBeGreaterThan(
      0,
    );
    expect(walletGenerator.generatedWallet.password).toBe(testPassword);
    expect(typeof walletGenerator.encryptedWallet).toBe('string');
    expect(walletGenerator.encryptedWallet.length).toBeGreaterThan(0);
    done();
  });
});
