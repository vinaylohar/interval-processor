import { IntervalService } from '../src/services/interval-service.js';

/**
 * Simple integration tests
 */
class IntegrationTest {
    private testCount = 0;
    private passedCount = 0;

    assert(actual: any, expected: any, message: string): void {
        this.testCount++;
        if (JSON.stringify(actual) === JSON.stringify(expected)) {
            this.passedCount++;
            console.log(`✅ ${message}`);
        } else {
            console.log(`❌ ${message}`);
            console.log(`   Expected: ${JSON.stringify(expected)}`);
            console.log(`   Actual:   ${JSON.stringify(actual)}`);
        }
    }

    async runTests(): Promise<void> {
        console.log('Running integration tests...\n');

        // Test all provided examples
        await this.testExample1();
        await this.testExample2();
        await this.testExample3();
        await this.testExample4();
        await this.testErrorHandling();

        this.printSummary();
    }

    async testExample1(): Promise<void> {
        try {
            const result = await IntervalService.processIntervalRequest({
                includes: ['10-100'],
                excludes: ['20-30']
            });
            this.assert(result.result, ['10-19', '31-100'], 'Example 1: Basic subtraction');
        } catch (error) {
            console.log(`❌ Example 1 failed: ${error}`);
            this.testCount++;
        }
    }

    async testExample2(): Promise<void> {
        try {
            const result = await IntervalService.processIntervalRequest({
                includes: ['50-5000', '10-100'],
                excludes: []
            });
            this.assert(result.result, ['10-5000'], 'Example 2: No excludes with merging');
        } catch (error) {
            console.log(`❌ Example 2 failed: ${error}`);
            this.testCount++;
        }
    }

    async testExample3(): Promise<void> {
        try {
            const result = await IntervalService.processIntervalRequest({
                includes: ['200-300', '50-150'],
                excludes: ['95-205']
            });
            this.assert(result.result, ['50-94', '206-300'], 'Example 3: Complex overlap');
        } catch (error) {
            console.log(`❌ Example 3 failed: ${error}`);
            this.testCount++;
        }
    }

    async testExample4(): Promise<void> {
        try {
            const result = await IntervalService.processIntervalRequest({
                includes: ['200-300', '10-100', '400-500'],
                excludes: ['410-420', '95-205', '100-150']
            });
            this.assert(result.result, ['10-94', '206-300', '400-409', '421-500'], 'Example 4: Multiple intervals');
        } catch (error) {
            console.log(`❌ Example 4 failed: ${error}`);
            this.testCount++;
        }
    }

    async testErrorHandling(): Promise<void> {
        try {
            await IntervalService.processIntervalRequest({
                includes: ['invalid-format'],
                excludes: []
            });
            console.log(`❌ Error handling test failed - should have thrown error`);
            this.testCount++;
        } catch (error) {
            console.log(`✅ Error handling - correctly caught validation error`);
            this.testCount++;
            this.passedCount++;
        }
    }

    printSummary(): void {
        console.log(`\n📊 Test Summary: ${this.passedCount}/${this.testCount} tests passed`);
        if (this.passedCount === this.testCount) {
            console.log('🎉 All tests passed!');
        } else {
            console.log(`💥 ${this.testCount - this.passedCount} tests failed`);
            process.exit(1);
        }
    }
}

// Run tests
const test = new IntegrationTest();
test.runTests();